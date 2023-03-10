const express = require("express");
const router = express.Router();
const PostController = require("../Controllers/PostController");
require("express-group-routes");

// Get all posts
router.get("/", PostController.index);

// Store post
router.post("/", PostController.store);

module.exports = router;
