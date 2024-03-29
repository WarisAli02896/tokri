const express = require("express");
const { register_User } = require("../../controller/customer/auth/register");
const { verify_user } = require("../../controller/auth/authorization");
const { login } = require("../../controller/customer/auth/login");
const router = express.Router();

router.post("/user/register", register_User);
router.get("/user/verify", verify_user);
router.post("/user/login", login);

module.exports = router;
