const { StatusCodes } = require("http-status-codes");
const Shops = require("../../../data/models/shops/shops");
const Users = require("../../../data/models/auth/users");

exports.registerShop = async(req,res)=>{
    const reqData = req.body;

    const shop = await Shops.create({
        reqData
    })
    .then(async (shop)=>{
        await Users.findByPk(shop.user_id, {
            attributes:{
                exclude: ["password"]
            }
        })
        .then((user)=>{
            return res.status(StatusCodes.OK).json({
                data:{
                    User: user,
                    Shop: shop
                }
            });
        })
        .catch((error)=>{
            return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
                data:{
                    erorMessage:"Shop not created please try again!"
                }
            })
        })
    })
}