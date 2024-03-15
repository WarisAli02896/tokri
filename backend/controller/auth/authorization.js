const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Users = require("../../data/models/auth/users");

exports.verify_user = (req, res) => {
    const reqData = req.query;

    const user = Users.findAll(
        {
            limit: 1,
            where: {
                user_id: reqData.id
            },
            attributes: {
                exclude: ['password']
            }
        }
    )
        .then(async (user) => {
            if (user.length >= 1) {
                if (user[0].verified == 0 || user[0].verified == false) {
                    let verify = await Users.update(
                        {
                            verified: 1
                        },
                        {
                            where: {
                                user_id: reqData.id
                            }
                        }
                    )
                        .then((verify) => {
                            if (verify.length >= 1) {
                                return res.status(StatusCodes.OK).json({
                                    data: {
                                        message: "Your account has been verified",
                                        User: user[0]
                                    }
                                })
                            } else if (verify.length < 1) {
                                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                    Data: {
                                        Error: {
                                            errorMessage: "User verification failed please try again",
                                            error
                                        }
                                    }
                                })
                            }
                        })
                        .catch((error) => {
                            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                Data: {
                                    Error: {
                                        errorMessage: "Connection Error",
                                        error
                                    }
                                }
                            })
                        })
                } else if (user[0].verified == 1 || user[0].verified == true) {
                    return res.status(StatusCodes.OK).json({
                        data: {
                            message: "Your account is already verified"
                        }
                    })
                }
            } else if (user.length == 0 || user.length == null) {
                return res.status(StatusCodes.OK).json({
                    data: {
                        message: "Your email is not registered on Tokri. Please sign up first"
                    }
                })
            }
        })
        .catch((error) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                Data: {
                    Error: {
                        errorMessage: "User not found",
                        error
                    }
                }
            })
        })
}

//api for varify update querry
exports.varify_shop = async (req, res) => {
    const reqData = req.query;
  
    await Shops.findone({
      where: {
        shop_id: reqData.id,
      },
    })
      .then(async (shop) => {
        if (shop.length >= 1) {
          if (shop[0].verified == 0 || shop[0].verified == false) {
            await Shops.update(
              {
                verified: true,
              },
              {
                where: {
                  shop_id: reqData.id,
                },
              }
            )
              .then(async (verify) => {
                if (verify.length >= 1) {
                  return res.status(StatusCodes.OK).json({
                    data: {
                      message: "varified status has been updated",
                      Shops: verify,
                    },
                  });
                } else if (verify.length < 1) {
                  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    Data: {
                      Error: {
                        errorMessage: "can't update please try again letter",
                        error,
                      },
                    },
                  });
                }
              })
              .catch((error) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  Data: {
                    Error: {
                      errorMessage: "Connection Error",
                      error,
                    },
                  },
                });
              });
          } else if (shop[0].verified == 1 || shop[0].verified == true) {
            return res.status(StatusCodes.OK).json({
              data: {
                message: "Its Already true",
              },
            });
          }
        } else if (shop.length == 0 || shop.length == null) {
          return res.status(StatusCodes.OK).json({
            data: {
              message: "No Records found to update",
            },
          });
        }
      })
      .catch((error) => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          Data: {
            Error: {
              errorMessage: "something went wrong",
              error,
            },
          },
        });
      });
  };
  

exports.validate_User_for_Shop = (req, res, next) => {
    const reqData = req.body;
    if (req.body.User.type == "Shop Keeper") {
        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data:{
                errorMessage:"Only shop keeper is allowed to create shop"
            }
        })

    }
}

