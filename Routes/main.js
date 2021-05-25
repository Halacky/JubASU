const express = require('express');
const controller = require('../Controllers/main');
const router = express.Router();

router.get("/", controller.getAll);

module.exports = router;