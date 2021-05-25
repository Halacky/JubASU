const express = require('express');
const controller = require('../Controllers/gallery');
const upload = require("../middleware/upload")
const router = express.Router();
const galery =require("../Models/Gallery");
const fs = require('fs');
const path = require('path');

router.get("/", controller.getAllGallery);

module.exports = router;