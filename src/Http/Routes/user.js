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
  router.get("/:id", UserController.show);

  // Update user
  router.put("/:id", UserController.update);

  // Find users by filter
  router.get("/filter", async (req, res) => {
    try {
      // Call instance method
      const users = new User();
      const data = await users.filter(req.body).find({ status: 1 });
      res.status(200).send({ data: data });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  });

  // Find users by active status
  router.get("/active", async (req, res) => {
    try {
      // Call static method
      const data = await User.active();
      res.status(200).send({ data: data });
    } catch (err) {
      res.status(500).send({ message: "Something went wrong" });
    }
  });

  //Insert multiple users at a time

  router.post("/many", (req, res) => {
    User.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({ message: "Users inserted successfully!" });
      }
    });
  });

  // delete single user
  router.delete("/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id }).exec((err) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong!" });
      } else {
        res.send({ message: "User deleted  successfully!" });
      }
    });
  });
});

module.exports = router;
