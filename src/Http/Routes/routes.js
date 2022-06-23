const express = require("express");
const router = express.Router();
const user = require("./user");
const PostController = require("../Controllers/PostController");
const authMiddleware = require("../Middlewares/Auth");

router.use("/user", user);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/post", authMiddleware, PostController.index);
router.post("/post", authMiddleware, PostController.store);

module.exports = router;
