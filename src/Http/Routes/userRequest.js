const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../../Schemas/userSchema");

const User = new mongoose.model("User", userSchema);

// Find all users
router.get("/", async (req, res) => {
  await User.find({})
    .select({ _id: 0 })
    .limit(2)
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong!" });
      } else {
        res.send({ data: users });
      }
    });
});

// find single user
router.get("/:id", async (req, res) => {
  await User.find({ _id: req.params.id })
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

router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save((err) => {
    if (err) {
      res.status(500).send({ message: "Something went wrong!" });
    } else {
      res.status(200).send({ message: "User inserted successfully!" });
    }
  });
});

//Insert multiple users at a time

router.post("/many", async (req, res) => {
  await User.insertMany(req.body, (err) => {
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
router.delete("/:id", async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .exec((err) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong!" });
      } else {
        res.send({ message: "User deleted  successfully!" });
      }
    });
});

module.exports = router;
