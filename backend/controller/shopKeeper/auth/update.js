const { StatusCodes } = require("http-status-codes");
const ShopKeeper = require("../../../data/models/shopKeeper/auth/shopKeeper");
const { filter_merge_object } = require("../../../middleware/common");
const {
  update_accepted_data,
  shopKeeper,
} = require("../../../data/objects/shopKeeper/auth/shopKeeper");
const {
  update_email_verification_body,
} = require("../../../data/objects/mail/mailBody");

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
        errorCode: "auth0010",
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
        errorCode: "auth0011",
      },
    });
  } else if (reqData.is_deleted != null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage: "Account can not be deleted from here",
        errorCode: "auth0012",
      },
    });
  } else if (reqData.password != null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage: "Password can not be chnage from here",
        errorCode: "auth0013",
      },
    });
  } else if (reqData.verified != null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage:
          "Your account can not verify from here. Please check confirmation mail to verify your account",
        errorCode: "auth0014",
      },
    });
  } else {
    let updateShopkeeper = filter_merge_object(reqData, update_accepted_data);

    if (updateShopkeeper != null || updateShopkeeper != undefined) {
      await ShopKeeper.update(updateShopkeeper, {
        where: {
          shopkeeper_id: reqData.body.User.id,
        },
      })
        .then(async (shopKeeper) => {
          if (
            updateShopkeeper.email != null ||
            updateShopkeeper.email != undefined
          ) {
            try {
              update_email_verification_body.to = shopKeeper.dataValues.email;
              //set according to new API
              update_email_verification_body.text += `/n${process.env.BASE_URL}/user/verify?id=${shopKeeper.dataValues.id}&type=ShopKeeper`;
              await _sendMail(update_email_verification_body);

              await Mail.create({
                from: update_email_verification_body.from,
                to: update_email_verification_body.to,
                subject: update_email_verification_body.subject,
                text: update_email_verification_body.text,
                reason: `Account verification mail sent to shopkeeper/n ShopKeeper_id:${shopKeeper.dataValues.shopKeeper_id}`,
                type: "Keeper Account Verification",
                status: true,
              })
                .then(async (mail) => {
                  return res.status(StatusCodes.OK).json({
                    data: {
                      responseMessage:
                        "Account created successfully. Please check email for account verification",
                      responseCode: "auth0004",
                      ShopKeeper: shopKeeper.dataValues,
                      Mail: mail,
                    },
                  });
                })
                .catch(async (error) => {
                  return res.status(StatusCodes.OK).json({
                    data: {
                      responseMessage:
                        "Account created successfully. Please check email for account verification",
                      responseCode: "auth0004",
                      ShopKeeper: shopKeeper.dataValues,
                    },
                  });
                });
            } catch (error) {
              await Mail.create({
                from: update_email_verification_body.from,
                to: update_email_verification_body.to,
                subject: update_email_verification_body.subject,
                text: update_email_verification_body.text,
                reason: `Account verification mail sent to shopkeeper/n ShopKeeper_id:${shopKeeper.dataValues.shopKeeper_id}`,
                type: "Keeper Account Verification",
                status: false,
              })
                .then(async (mail) => {
                  return res.status(StatusCodes.OK).json({
                    data: {
                      responseMessage:
                        "Account created successfully. Please check email for account verification",
                      responseCode: "auth0004",
                      ShopKeeper: shopKeeper.dataValues,
                      Mail: mail,
                    },
                  });
                })
                .catch(async (error) => {
                  return res.status(StatusCodes.OK).json({
                    data: {
                      responseMessage:
                        "Account created successfully. Please check email for account verification",
                      responseCode: "auth0004",
                      ShopKeeper: shopKeeper.dataValues,
                    },
                  });
                });
            }
          }
          return res.status(StatusCodes.OK).json({
            data: {
              responseMessage: "Profile updated successfully.",
              responseCode: "auth0016",
              ShopKeeper: shopKeeper.dataValues,
            },
          });
        })
        .catch(async (error) => {
          return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            data: {
              errorMessage: "Profile update failed please try again",
              errorCode: "auth0017",
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
          responseMessage: "Shopkeeper updated successfully",
          responseMessage: "auth0015",
        },
      });
    }
  }
};

exports.update_email = async (req, res) => {
  const reqData = req.query;
  const decryptData = reqData;
  ShopKeeper.findOne({
    where: {
      shopKeeper_id: decryptData.id,
      email: decryptData.email,
    },
    attributes: {
      exclude: ["passward"],
    },
  })
    .then(async (shopKeeper) => {
      if (shopKeeper == null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          data: {
            errorMessage: "You are unauthorized",
            errorCode: "auth0021",
          },
        });
      } else if (shopKeeper != null) {
        ShopKeeper.update(
          {
            email: decryptData.new_email,
          },
          {
            where: {
              shopKeeper_id: decryptData.id,
            },
          }
        )
          .then(async (shop_Keeper) => {
            return res.status(StatusCodes.OK).json({
              data: {
                responseMessage: " Email successfully updated",
                responseCode: "auth0022",
                shopKeeper: shop_Keeper.dataValues,
              },
            });
          })
          .catch(async (error) => {
            return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
              data: {
                errorMessage: "Email update failed please try again",
                errorCode: "auth0023",
                Error: {
                  message: error.message,
                  error,
                },
              },
            });
          });
      }
    })
    .catch(async (error) => {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        data: {
          errorMessage: "Email update failed please try again",
          errorCode: "auth0023",
          Error: {
            message: error.message,
            error,
          },
        },
      });
    });
};

//code to update the password
exports.update_password = async (req, res) => {
  const reqData = req.body;
  //condition to chech newpass and confirm pass are same
  if (reqData.newpassword == reqData.confirmpassword){
    await ShopKeeper.findOne({
      where:
          {
            shopKeeper_id: reqData.User.shopKeeper_id,
            //password: reqData.password,
          },
     })
      .then(async(data)=>{
       if (await bcrypt.compare(reqData.password, data.dataValues.password)) {
          try {
              reqData.newpassword = hashSync(reqData.newpassword, genSaltSync(parseInt(process.env.SALT)));
              ShopKeeper.update(
              {
                password: reqData.newpassword,
              },{
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
        }else if (!await bcrypt.compare(reqData.password, data.dataValues.password)) {
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