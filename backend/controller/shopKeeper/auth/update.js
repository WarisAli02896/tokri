const { StatusCodes } = require("http-status-codes");
const ShopKeeper = require("../../../data/models/shopKeeper/auth/shopKeeper");
const { filter_merge_object } = require("../../../middleware/common");
const { update_accepted_data, shopKeeper, } = require("../../../data/objects/shopKeeper/auth/shopKeeper");
const { update_email_verification_body, } = require("../../../data/objects/mail/mailBody");
const { update_email } = require("../../../data/objects/urls/encryptPath");
const { encrypt_Url, decrypt_Url } = require("../../../middleware/urlEncryption");
const Mail = require("../../../data/models/sync/mail");
const { _sendMail } = require("../../../utils/send_email");
const Update = require("../../../data/models/sync/update");


exports.update_shopkeeper = async (req, res) => {
  const reqData = req.body;

  if (
    reqData.cnic != null ||
    reqData.cnic_front != null ||
    reqData.cnic_back != null ||
    reqData.ntn != null
  ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage:
          "Not allowed to change cnic or ntn. Please contact support team to change cnic or ntn",
        errorCode: "auth0007",
      },
    });
  } else if (
    reqData.type != null ||
    reqData.shopkeeper_id != null ||
    reqData.createdAt != null ||
    reqData.updatedAt != null
  ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage: "Shop Keeper type or Id can not be changed",
        errorCode: "auth0008",
      },
    });
  } else if (reqData.is_deleted != null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage: "Account can not be deleted from here",
        errorCode: "auth0009",
      },
    });
  } else if (reqData.password != null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage: "Password can not be chnage from here",
        errorCode: "auth0009",
      },
    });
  } else if (reqData.verified != null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage:
          "Your account can not verify from here. Please check confirmation mail to verify your account",
        errorCode: "auth0009",
      },
    });
  } else {
    let updateShopkeeper = filter_merge_object(reqData, update_accepted_data);

    if (updateShopkeeper != null || updateShopkeeper != undefined) {
      await ShopKeeper.update(updateShopkeeper, {
        where: {
          shopkeeper_id: reqData.User.shopKeeper_id,
        },
        returning: true
      })
        .then(async (shopKeeper) => {
          return res.status(StatusCodes.OK).json({
            data: {
              responseMessage: "Profile updated successfully.",
              responseCode: "auth0010"
            },
          });
        })
        .catch(async (error) => {
          return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            data: {
              errorMessage: "Profile update failed please try again",
              errorCode: "auth0012",
              Error: {
                message: error.message,
                error,
              },
            },
          });
        });
    } else if (updateShopkeeper == null || updateShopkeeper == undefined) {
      return res.status(StatusCodes.OK).json({
        data: {
          responseMessage: "Profile updated successfully",
          responseMessage: "auth0010",
        },
      });
    }
  }
};

exports.update_email = async (req, res) => {
  const reqData = req.query;
  let decryptData = null;

  await Update.findByPk(
    reqData.set
  )
    .then(async (data) => {
      decryptData = decrypt_Url(data.dataValues.data);
    })
    .catch(async (error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: {
          errorMessage: "Email update failed, try again or request to update email again from profile",
          errorCode: "auth0000"
        }
      });
    })

  await ShopKeeper.findOne({
    where: {
      shopKeeper_id: decryptData.id,
      email: decryptData.email,
    },
    attributes: {
      exclude: ["passward"],
    },
  }).then(async (shopKeeper) => {
    if (shopKeeper == null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        data: {
          errorMessage: "You are unauthorized",
          errorCode: "auth0021"
        }
      })
    } else if (shopKeeper != null) {
      await ShopKeeper.update({
        email: decryptData.new_email
      }, {
        where: {
          shopKeeper_id: decryptData.id
        }
      }).then(async (shop_Keeper) => {
        return res.status(StatusCodes.OK).json({
          data: {
            responseMessage: " Email successfully updated",
            responseCode: "auth0022"
          }
        })
      }).catch(async (error) => {
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
          data: {
            errorMessage: "Email update failed please try again",
            errorCode: "auth0023",
            Error: {
              message: error.message,
              error,
            }
          }
        })
      })
    }
  }).catch(async (error) => {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      data: {
        errorMessage: "Email update failed please try again",
        errorCode: "auth0023",
        Error: {
          message: error.message,
          error,
        }
      }
    })
  })
};

exports.verify_update_email = async (req, res) => {
  const reqData = req.body;

  if (reqData.new_email != null) {
    //Encrypt shopkeeper_id, old_email, new_email for creating querry params
    update_email.id = reqData.User.shopKeeper_id;
    update_email.email = reqData.User.email;
    update_email.new_email = reqData.new_email;
    const url_path = encrypt_Url(update_email);

    //send update data to update table
    await Update.create(
      {
        data: url_path
      }
    )
      .then(async (data) => {
        try {
          //set mail body
          update_email_verification_body.to = reqData.User.email;
          //set according to new API
          update_email_verification_body.text += `/n${process.env.BASE_URL}/shopkeeper/update/email?set=${data.dataValues.id}`;
          await _sendMail(update_email_verification_body);

          await Mail.create({
            from: update_email_verification_body.from,
            to: update_email_verification_body.to,
            subject: update_email_verification_body.subject,
            text: update_email_verification_body.text,
            reason: `Verify new email address updated on shopkeeper/n ShopKeeper_id:${reqData.User.shopKeeper_id}`,
            type: "New email verification",
            status: true,
          })
            .then(async (mail) => {
              return res.status(StatusCodes.OK).json({
                data: {
                  responseMessage:
                    "Profile updated successfully. Check mail on provided email address to verify your new email address",
                  responseCode: "auth0010"
                },
              });
            })
            .catch(async (error) => {
              return res.status(StatusCodes.OK).json({
                data: {
                  responseMessage:
                    "Profile updated successfully. Check mail on provided email address to verify your new email address",
                  responseCode: "auth0010",
                },
              });
            });
        } catch (error) {
          await Mail.create({
            from: update_email_verification_body.from,
            to: update_email_verification_body.to,
            subject: update_email_verification_body.subject,
            text: update_email_verification_body.text,
            reason: `Verify new email address updated on shopkeeper/n ShopKeeper_id:${-reqData.User.shopKeeper_id}`,
            type: "New email verification",
            status: false,
          })
            .then(async (mail) => {
              return res.status(StatusCodes.OK).json({
                data: {
                  responseMessage:
                    "Profile updated successfully. Check mail on provided email address to verify your new email address",
                  responseCode: "auth0010"
                },
              });
            })
            .catch(async (error) => {
              return res.status(StatusCodes.OK).json({
                data: {
                  responseMessage:
                    "Profile updated successfully. Check mail on provided email address to verify your new email address",
                  responseCode: "auth0010"
                },
              });
            });
        }
      })
      .catch(async (error) => {
        return res.status(StatusCodes).json({
          data: {
            errorMessage: "Email can not update please try again",
            errorCode: "auth0000",
            Error: {
              errorMessage: error.message,
              errorCode: error.status,
              error
            }
          }
        })
      })

  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {
        errorMessage: "No new email provided",
        errorCode: "auth0012"
      }
    })
  }
}



//code to update the password
exports.update_password = async (req, res) => {
  const reqData = req.body;
  await ShopKeeper.findOne({
    where:
    {
      shopKeeper_id: reqData.User.shopKeeper_id

    },
  })
  //condition to chech newpass and confirm pass are same
  if (reqData.newpassword == reqData.confirmpassword) {
    await ShopKeeper.findOne({
      where:
      {
        shopKeeper_id: reqData.User.shopKeeper_id,
        //password: reqData.password,
      },
    })
      .then(async (data) => {
        if (await bcrypt.compare(reqData.password, data.dataValues.password)) {
          try {
            reqData.newpassword = hashSync(reqData.newpassword, genSaltSync(parseInt(process.env.SALT)));
            ShopKeeper.update(
              {
                password: reqData.newpassword,
              }, {
              where:
              {
                shopKeeper_id: reqData.User.shopKeeper_id
              }
            }
            ).then(async (shop_Keeper) => {
              return res.status(StatusCodes.OK).json({
                data: {
                  responseMessage: " Password has successfully updated",
                  responseCode: "auth00"

                },
              });
            })
              .catch(async (error) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  data: {
                    errorMessage: "Password update failed please try again",
                    errorCode: "auth0000",
                    Error: {
                      message: error.message,
                      error,
                    },
                  },
                });
              });
          }
          catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              data: {
                errorMessage: "Unable to update, Please try again",
                errorCode: "auth000",
                logs: {
                  message: error.message,
                  error
                }
              }
            });
          }
        } else if (!await bcrypt.compare(reqData.password, data.dataValues.password)) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {
              errorMessage: "Entered incorrect password",
              errorCode: "auth0018"
            }
          });
        }
      })
      .catch(async (error) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          data: {
            errorMessage: "Account not Created! Please try again/n",
            errorCode: "auth0002",
            error: {
              message: error.message,
              error
            }
          }
        })
      })
  } else if (reqData.password != reqData.confirmPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage: "Password and Confirm Password does not match",
        errorCode: "auth0006"
      }
    })
  }
}