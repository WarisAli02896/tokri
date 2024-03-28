const express = require('express');
const { verifyAccessToken } = require('../../middleware/jsontoken');
const { update_shopkeeper, update_password } = require('../../controller/shopKeeper/auth/update');
const { login_shopKeeper } = require('../../controller/shopKeeper/auth/login');
const router = express.Router();

router.put('/shopkeeper/update', verifyAccessToken, update_shopkeeper);
router.post('/shopkeeper/login', login_shopKeeper);
router.put('/shopkeeper/changepassword',verifyAccessToken,update_password);

module.exports = router