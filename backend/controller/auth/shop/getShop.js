const { StatusCodes } = require("http-status-codes");
const Users = require("../../../data/models/auth/users");
const Shops = require("../../../data/models/shops/shops");

exports.get_Shop_By_User_Id = async (req, res) => {
    let reqData = req.query;
    reqData.body = req.body;

    await Users.findAll({
        where: {
            user_id: reqData.body.User.user_id
        },
        include: {
            model: Shops,
            as: 'shops'
        }
    }).then(([Shops]) => {
        if (Shops.shops.length > 0) {
            return res.status(StatusCodes.OK).json({
                data: {
                    User: Shops
                }
            })
        } else if (Shops.shops.length <= 0) {
            return res.status(StatusCodes.OK).json({
                data: {
                    responseMessage: "No shop registered for this user",
                    User: Shops
                }
            })
        }
    }).catch((error) => {
        return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {
                errorMessage: "Unable get shops list",
                error
            }
        })
    })
}

exports.get_shop_by_id = async (req, res) => {
    let reqData = req.query;
    reqData.body = req.body;

    await Users.findOne({
        where: {
            user_id: reqData.body.User.user_id
        },
        include: {
            model: Shops,
            as: 'shops',
            where: {
                shop_id: reqData.shop_id
            }
        }
    }).then((Shops) => {
        if (Shops != null) {
            return res.status(StatusCodes.OK).json({
                data: {
                    Shops
                }
            })
        } else if (Shops == null) {
            return res.status(StatusCodes.OK).json({
                data: {
                    responseMessage: "Shop is not available"
                }
            })
        }
    }).catch((error) => {
        return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {
                errorMessage: "Unable get shops list",
                error
            }
        })
    })

}