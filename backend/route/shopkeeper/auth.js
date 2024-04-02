const express = require('express');
const { verifyAccessToken } = require('../../middleware/jsontoken');
const { update_shopkeeper, update_password, verify_update_email, update_email } = require('../../controller/shopKeeper/auth/update');
const { login_shopKeeper } = require('../../controller/shopKeeper/auth/login');
const router = express.Router();

router.put('/shopkeeper/update', verifyAccessToken, update_shopkeeper);
router.put('/shopkeeper/verify/email', verifyAccessToken, verify_update_email);
router.put('/shopkeeper/update/email', update_email);
router.post('/shopkeeper/login', login_shopKeeper);
router.put('/shopkeeper/changepassword',verifyAccessToken,update_password);

module.exports = router