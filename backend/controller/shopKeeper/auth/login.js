const { StatusCodes } = require("http-status-codes");
const ShopKeeper = require("../../../data/models/shopKeeper/auth/shopKeeper");
const { jwtShopkeeperPayload } = require("../../../data/objects/auth/jwtToken");
const bcrypt = require('bcryptjs');
const { jwtToken } = require("../../../middleware/jsontoken");
const { merge_objects } = require("../../../middleware/common");

exports.login_shopKeeper = async (req, res) => {
    const reqData = req.body;

    await ShopKeeper.findOne({
        where: {
            email: reqData.email
        },
        limit: 1
    })
        .then(async (data) => {
            if (data != null) {
                if (await bcrypt.compare(reqData.password, data.dataValues.password)) {
                    try {
                        delete data.dataValues.password;
                        data.dataValues.token = await jwtToken(merge_objects(jwtShopkeeperPayload, data.dataValues));
                        return res.status(StatusCodes.OK).json({
                            data: {
                                responseMessage: "logged in Successfully",
                                responseCode: "auth0001",
                                User: data.dataValues
                            }
                        });
                    }
                    catch (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            data: {
                                errorMessage: "Unable to login user! Please try again",
                                errorCode: "auth0000",
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
                            errorCode: "auth0002"
                        }
                    });
                }
            } else if (data == null) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    data: {
                        errorMessage: "Your email is not registered",
                        errorCode: "auth0003"
                    }
                });
            }
        })
        .catch((err) => {
            return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {
                    errorMessage: "Unable to login please try again",
                    errorCode: "auth0000",
                    Error: {
                        message: err.message,
                        err
                    }
                }
            })
        })
}