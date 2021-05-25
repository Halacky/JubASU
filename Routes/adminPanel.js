const express = require('express');
const contrFeedback = require('../Controllers/feedback');
const contrGallery = require('../Controllers/gallery');
const router = express.Router();

router.use(require("body-parser").urlencoded({extended:true})); //Подключаем body-parser (работа с json-ами) 
router.use(require("body-parser").json());

router.delete("/:id", contrFeedback.deleteReview);
router.get("/:id", contrFeedback.getFeedById);
router.get("/upload/", contrGallery.getViewUpload); //worked
router.post("/upload/", contrGallery.upload);

module.exports = router;