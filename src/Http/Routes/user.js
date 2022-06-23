const express = require("express");
const router = express.Router();
const { User } = require("../../Schemas/Models");
const UserController = require("../Controllers/UserController");

// Find all users
router.get("/", UserController.index);

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

// find single user
router.get("/:id", (req, res) => {
  User.find({ _id: req.params.id })
    .select({ _id: 0 })
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong!" });
      } else {
        res.send({ data: users });
      }
    });
});

//Insert single user at a time

router.post("/", (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err) => {
    if (err) {
      res.status(500).send({ message: "Something went wrong!" });
    } else {
      res.status(200).send({ message: "User inserted successfully!" });
    }
  });
});

//Insert multiple users at a time

router.post("/many", (req, res) => {
  User.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).send({ message: "Something went wrong!" });
    } else {
      res.status(200).send({ message: "Users inserted successfully!" });
    }
  });
});

//Update user at a time

router.put("/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { status: req.body.status } },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong!" });
      } else {
        res
          .status(200)
          .send({ message: "User updated successfully!", data: data });
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

// find single user
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).exec((err) => {
    if (err) {
      res.status(500).send({ message: "Something went wrong!" });
    } else {
      res.send({ message: "User deleted  successfully!" });
    }
  });
});

module.exports = router;
