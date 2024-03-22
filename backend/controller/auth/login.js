const Users = require("../../data/models/customer/auth/users");
const bcrypt = require('bcryptjs');
const { merge_objects } = require("../../middleware/common");
const { jwtPayload } = require("../../data/objects/auth/jwtToken");
const { jwtToken } = require("../../middleware/jsontoken");
const { StatusCodes } = require("http-status-codes");

exports.login = async (req, res) => {
    const reqData = req.body;

    const data = Users.findOne({
        where: {
            email: reqData.email
        },
        limit: 1
    })
        .then(async (data) => {
            if (data != null) {
                if (await bcrypt.compare(reqData.password, data.dataValues.password)) {
                    try {
                        data.dataValues.token = await jwtToken(merge_objects(jwtPayload, data.dataValues));
                        return res.status(StatusCodes.OK).json({
                            data:{
                                responseMessage:"User logged in",
                                User: data.dataValues
                            }
                        })
                    }
                    catch (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            data: {
                                errorMessage: "Unable to login user! Please try again",
                                error
                            }
                        });
                    }
                } else if (!await bcrypt.compare(reqData.password, data.dataValues.password)) {
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        data: {
                            errorMessage: "User entered incorrect password"
                        }
                    });
                }
            } else if (data == null) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    data: {
                        errorMessage: "Your email is not registered"
                    }
                });
            }
        })
        .catch((err) => {
            return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {
                    errorMessage: "Unable to login please try again"
                }
            })
        })
}