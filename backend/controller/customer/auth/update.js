const { StatusCodes } = require("http-status-codes");
const { filter_merge_object } = require("../../../middleware/common");
const {
  update_accepted_data,
} = require("../../../data/objects/customer/users");
const Users = require("../../../data/models/customer/auth/users");

//code for update_user  profile
exports.update_user = async (req, res) => {
  const reqData = req.body;

  if (
    reqData.type != null ||
    reqData.user_id != null ||
    reqData.createdAt != null ||
    reqData.updatedAt != null
  ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage: "User type or Id can not be changed",
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
    let updateCustomer = filter_merge_object(reqData, update_accepted_data);

    if (updateCustomer != null || updateCustomer != undefined) {
      await Users.update(updateCustomer, {
        where: {
          user_id: reqData.User.user_id,
        },
      })
        .then(async (customerUser) => {
          return res.status(StatusCodes.OK).json({
            data: {
              responseMessage: "Profile updated successfully.",
              responseCode: "auth0010",
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
    } else if (updateCustomer == null || updateCustomer == undefined) {
      return res.status(StatusCodes.OK).json({
        data: {
          responseMessage: "Profile updated successfully",
          responseMessage: "auth0010",
        },
      });
    }
  }
};

//code to update the password
exports.update_password = async (req, res) => {
  const reqData = req.body;

  await Customer.findOne({
    where: {
      user_id: reqData.User.user_id,
    },
  });

  //condition to chech newpass and confirm pass are same
  if (reqData.newpassword == reqData.confirmpassword) {
    await Customer.findOne({
      where: {
        user_id: reqData.User.user_id,
      },
    })
      .then(async (data) => {
        if (await bcrypt.compare(reqData.password, data.dataValues.password)) {
          try {
            reqData.newpassword = hashSync(
              reqData.newpassword,
              genSaltSync(parseInt(process.env.SALT))
            );
            Users.update(
              {
                password: reqData.newpassword,
              },
              {
                where: {
                  user_id: reqData.User.user_id,
                },
              }
            )
              .then(async (user_customer) => {
                return res.status(StatusCodes.OK).json({
                  data: {
                    responseMessage: " Password has successfully updated",
                    responseCode: "auth00",
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
          } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              data: {
                errorMessage: "Unable to update, Please try again",
                errorCode: "auth000",
                logs: {
                  message: error.message,
                  error,
                },
              },
            });
          }
        } else if (
          !(await bcrypt.compare(reqData.password, data.dataValues.password))
        ) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {
              errorMessage: "Entered incorrect password",
              errorCode: "auth0018",
            },
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
              error,
            },
          },
        });
      });
  } else if (reqData.password != reqData.confirmPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      data: {
        errorMessage: "Password and Confirm Password does not match",
        errorCode: "auth0006",
      },
    });
  }
};
