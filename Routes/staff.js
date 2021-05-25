const express = require('express');
const controller = require('../Controllers/staff');
const router = express.Router();

router.get("/", controller.getStaff);

module.exports = router;