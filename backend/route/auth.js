const express = require('express');
const { register_Shop } = require('../controller/auth/user/register');
const { verify_user } = require('../controller/auth/authorization');
const { login } = require('../controller/auth/user/login');
const { verifyAccessToken } = require('../middleware/jsontoken');
const router = express.Router()

router.post('/user/register', register_Shop);
router.put('/user/verifyUser', verify_user);
router.post('/user/login',  login)

module.exports = router;