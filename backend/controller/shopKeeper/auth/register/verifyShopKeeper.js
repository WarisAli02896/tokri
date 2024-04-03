const ShopKeeper = require("../../../../data/models/shopKeeper/auth/shopKeeper");
const { decrypt } = require("../../../../middleware/urlEncryption");

exports.verify_shop_keeper = async (req, res) => {
    const reqData = req.query;

    reqData.id = await decrypt(reqData.id);

    await ShopKeeper.update(
        {
            verified: true
        }, {
        where: {
            shopKeeper_id: reqData.id
        }
    }
    )
    .then(async)
}