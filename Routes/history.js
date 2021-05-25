const express = require('express');
const controller = require('../Controllers/history');
const router = express.Router();

router.get("/", controller.getHistory);

module.exports = router;