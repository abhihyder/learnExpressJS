const express = require("express");
const router = express.Router();
const { User } = require("../../Schemas/Models");
const UserController = require("../Controllers/UserController");
const authMiddleware = require("../Middlewares/Auth");
require("express-group-routes");

//User register
router.post("/register", UserController.register);

// User login
router.post("/login", UserController.login);
// Route group
router.group((router) => {
  router.use(authMiddleware);
  // Get all users
  router.get("/", UserController.index);

  // Show user
  router.get("/show/:id", UserController.show);

  // Update user
  router.put("/:id", UserController.update);

  // Find users by filter
  router.get("/filter", UserController.filter);

  // Find users by active status
  router.get("/active", UserController.active);

  //Insert multiple users at a time

  router.post("/storeMany", UserController.storeMany);

  // delete single user
  router.delete("/:id", UserController.delete);
});

module.exports = router;
