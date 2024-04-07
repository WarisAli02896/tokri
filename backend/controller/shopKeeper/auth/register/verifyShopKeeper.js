const ShopKeeper = require("../../../../data/models/shopKeeper/auth/shopKeeper");
const { shopKeeper } = require("../../../../data/objects/shopKeeper/auth/shopKeeper");
const { mapOutput } = require("../../../../middleware/lodash");
const { decrypt } = require("../../../../middleware/urlEncryption");

exports.verify_shop_keeper = async (req, res) => {
    const reqData = req.query;

    reqData.id = await decrypt(reqData.id);

    await ShopKeeper.findOne(
        {
            where: {
                shopkeeper_id: reqData.id
            }
        }
    )
    .then(async(data)=>{
        let shopkeeper = mapOutput(data, shopKeeper);
    })
}