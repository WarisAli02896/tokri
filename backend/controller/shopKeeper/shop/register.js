const { StatusCodes } = require("http-status-codes");
const Shops = require("../../../data/models/shopKeeper/shop/shops");
const Users = require("../../../data/models/customer/auth/users");
const { merge_objects } = require("../../../middleware/common");
var { shops } = require("../../../data/objects/shopKeeper/shop/shop");

exports.registerShop = async (req, res) => {
    const reqData = req.body;
    reqData.verified = 0;
    shops = merge_objects(shops, reqData);
    shops = merge_objects(shops, reqData.User)

    const shop = await Shops.create(shops)
        .then(async (shop) => {
            await Users.findByPk(shop.user_id, {
                attributes: {
                    exclude: ["password"]
                }
            })
                .then((user) => {
                    return res.status(StatusCodes.OK).json({
                        data: {
                            User: user,
                            Shop: shop
                        }
                    });
                })
                .catch((error) => {
                    return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
                        data: {
                            erorMessage: "Shop not created please try again!"
                        }
                    })
                })
        })
        .catch((error) => {
            return res.status(error.status).json({
                data: {
                    errorMessage: "Shop not created please try again",
                    error: error
                }
            })
        })
}