const express = require("express");
const { register_User } = require("../../controller/auth/user/register");
const { verify_user, validate_User_for_Shop } = require("../../controller/auth/authorization");
const { login } = require("../../controller/auth/user/login");
const router = express.Router();

router.post("/user/register", register_User);
router.put("/user/verify", verify_user);
router.post("/user/login", login);

module.exports = router;
