const express = require('express');
const { verifyAccessToken } = require('../../middleware/jsontoken');
const { validate_User_for_Shop } = require('../../middleware/user_validation');
const { registerShop } = require('../../controller/shopKeeper/shop/register');
const { get_Shop_By_User_Id, get_shop_by_id } = require('../../controller/shopKeeper/shop/getShop');
const { verify_shop } = require('../../controller/auth/authorization');
const { register } = require('../../controller/shopKeeper/auth/register');
const router = express.Router();

router.post("/shopkeeper/register", register);
router.post("/shop/register", verifyAccessToken, validate_User_for_Shop, registerShop);
router.get("/user/shops", verifyAccessToken, validate_User_for_Shop, get_Shop_By_User_Id);
router.get("/user/shops/shop", verifyAccessToken, validate_User_for_Shop, get_shop_by_id);
router.put("/shops/verify", verifyAccessToken, validate_User_for_Shop, verify_shop);

module.exports = router;