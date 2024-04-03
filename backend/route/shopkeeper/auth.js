const express = require('express');
const { verifyAccessToken } = require('../../middleware/jsontoken');
const { update_shopkeeper, update_password, verify_update_email, update_email } = require('../../controller/shopKeeper/auth/update');
const { login_shopKeeper } = require('../../controller/shopKeeper/auth/login');
const { register_shopkeeper } = require('../../controller/shopKeeper/auth/register/register');
const { verify_shop_keeper } = require('../../controller/shopKeeper/auth/register/verifyShopKeeper');
const router = express.Router();

router.post("/shopkeeper/register", register_shopkeeper);
router.put('/shopkeeper/verify', verify_shop_keeper);
router.post('/shopkeeper/login', login_shopKeeper);
router.put('/shopkeeper/update', verifyAccessToken, update_shopkeeper);
router.put('/shopkeeper/changepassword',verifyAccessToken,update_password);
router.put('/shopkeeper/verify/email', verifyAccessToken, verify_update_email);
router.put('/shopkeeper/update/email', update_email);

module.exports = router