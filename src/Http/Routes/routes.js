const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const postRoutes = require("./post");
const authMiddleware = require("../Middlewares/Auth");

router.get("/", (req, res) => {
  res.render("index");
});

router.use("/user", userRoutes);
// Route group
router.group((router) => {
  router.use(authMiddleware);

  router.use("/post", postRoutes);
});

module.exports = router;
