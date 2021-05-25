const express = require('express');
const controller = require('../Controllers/feedback');
const router = express.Router();
const upload = require('../middleware/upload');

router.get("/", controller.getAllReviews);
router.get("/:id", controller.getFeedById);
router.post("/", upload.single("image"), controller.addReview);

module.exports = router;