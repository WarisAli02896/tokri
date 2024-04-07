const express = require("express");
const { register_User } = require("../../controller/customer/auth/register/register");
const { verify_user } = require("../../controller/customer/auth/register/verifyCustomer");
const { login } = require("../../controller/customer/auth/login");
const { verifyAccessToken } = require("../../middleware/jsontoken");
const { update_user, update_password } = require("../../controller/customer/auth/update");
const { update_email, varify_update_email } = require("../../controller/customer/auth/email");
const router = express.Router();


router.post("/user/register", register_User);
router.get("/user/verify", verify_user);
router.post("/user/login", login);
router.put("/user/update", verifyAccessToken, update_user);
router.put("/user/changepassword", verifyAccessToken, update_password);
router.put('/user/verify/email', verifyAccessToken, varify_update_email);
router.put('/user/update/email', update_email);

module.exports = router;
