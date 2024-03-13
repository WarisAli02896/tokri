const express = require('express');
const { verifyAccessToken } = require('../../middleware/jsontoken');
const { validate_User_for_Shop } = require('../../controller/auth/authorization');
const { registerShop } = require('../../controller/auth/shop/register');
const { get_Shop_By_User_Id, get_shop_by_id } = require('../../controller/auth/shop/getShop');
const router = express.Router();

router.post("/shop/register", verifyAccessToken, validate_User_for_Shop, registerShop);
router.get("/user/shops", verifyAccessToken, validate_User_for_Shop, get_Shop_By_User_Id);
router.get("/user/shops/shop", verifyAccessToken, validate_User_for_Shop, get_shop_by_id);

module.exports = router;