const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Users = require("../../data/models/customer/auth/users");
const Shops = require("../../data/models/shopKeeper/shop/shops");
const ShopKeeper = require("../../data/models/shopKeeper/auth/shopKeeper");

//api for varify update querry
exports.verify_shop = async (req, res) => {
    const reqData = req.query;

    await Shops.findOne({
        where: {
            shop_id: reqData.id,
        },
    })
        .then(async (shop) => {
            if (shop != null) {
                if (shop.dataValues.verified == 0 || shop.dataValues.verified == false) {
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
                } else if (shop.dataValues.verified == 1 || shop.dataValues.verified == true) {
                    return res.status(StatusCodes.OK).json({
                        data: {
                            message: "Its Already true",
                        },
                    });
                }
            } else if (shop == null) {
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