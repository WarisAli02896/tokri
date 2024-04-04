const { StatusCodes } = require("http-status-codes");
const Users = require("../../../../data/models/customer/auth/users");
const { decrypt } = require("../../../../middleware/urlEncryption");

exports.verify_user = async (req, res) => {
    const reqData = req.query;
    reqData.id = await decrypt(reqData.id)

    await Users.findAll(
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
                            if (verify[0] == 1) {
                                return res.status(StatusCodes.OK).json({
                                    data: {
                                        responseMessage: "Your account has been verified",
                                        responseCode: "auth0009",
                                        User: user[0]
                                    }
                                })
                            } else if (verify[0] == 0) {
                                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                    data: {
                                        errorMessage: "User verification failed please try again",
                                        errorCode: "auth0000",
                                        Error: {
                                            errorMessage: error.message,
                                            errorCode: error.status,
                                            error
                                        }
                                    }
                                })
                            }
                        })
                        .catch((error) => {
                            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                data: {
                                    errorMessage: "Account not verified please try again",
                                    errorCode: "auth0010",
                                    Error: {
                                        errorMessage: error.message,
                                        errorCode: error.status,
                                        error
                                    }
                                }
                            })
                        })
                } else if (user[0].verified == 1 || user[0].verified == true) {
                    return res.status(StatusCodes.OK).json({
                        data: {
                            errorMessage: "Email already verified",
                            errorCode: "auth0011"
                        }
                    })
                }
            } else if (user.length == 0 || user.length == null) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    data: {
                        errorMessage: "Your email is not registered on tokri! Please register first",
                        errorCode: "auth0012"
                    }
                })
            }
        })
        .catch((error) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {
                    errorMessage: "User verification failed please try again",
                    errorCode: "auth0000",
                    Error: {
                        errorMessage: error.message,
                        errorCode: error.status,
                        error
                    }
                }
            })
        })
}