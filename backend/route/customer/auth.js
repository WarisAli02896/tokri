const express = require("express");
const { register_User } = require("../../controller/customer/auth/register");
const { verify_user } = require("../../controller/auth/authorization");
const { login } = require("../../controller/customer/auth/login");
const { verifyAccessToken } = require("../../middleware/jsontoken");
const { update_user } = require("../../controller/customer/auth/update");
const { update_password } = require("../../controller/shopKeeper/auth/update");
const router = express.Router();

router.put("/user/update", verifyAccessToken, update_user);
router.post("/user/register", register_User);
router.get("/user/verify", verify_user);
router.post("/user/login", login);
router.put("/user/changepassword", verifyAccessToken, update_password);

module.exports = router;
