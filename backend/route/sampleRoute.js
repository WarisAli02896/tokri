const express = require('express');
const { sampleFunction } = require('../controller/sampleComtroller');
const router = express.Router()

router.get('/sampleRoute', sampleFunction);

module.exports = router;