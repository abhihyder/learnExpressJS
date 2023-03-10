const { User } = require("../../Schemas/Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {};

UserController.register = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });
    await newUser.save();
    res.status(200).send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(422).json(err);
  }
};

UserController.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, status: 1 });

    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        const token = jwt.sign(
          { name: user.name, email: user.email, id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res
          .status(200)
          .json({ access_token: token, message: "Login successfull!" });
      } else {
        res.status(401).send({ message: "Authentication failed!" });
      }
    } else {
      res.status(401).send({ message: "Authentication failed!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

UserController.index = (req, res) => {
  // Callback pattern query
  User.find({})
    .select({ _id: 0 })
    .sort({ name: "asc" })
    .exec((err, users) => {
      if (err) {
        res.status(500).json({ message: "Something went wrongggg!" });
      } else {
        res.json({ data: users });
      }
    });
};

UserController.show = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id }, "-password");

    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

UserController.update = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.name) {
      updateData.name = req.body.name;
    }
    if (req.body.email) {
      updateData.email = req.body.email;
    }
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.body.status) {
      updateData.status = req.body.status;
    }
    let user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({ data: user, message: "User updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

UserController.storeMany = async (req, res) => {
  User.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ message: "Users inserted successfully!" });
    }
  });
};

UserController.active = async (req, res) => {
  try {
    // Call static method
    const data = await User.active();
    res.status(200).send({ data: data });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

UserController.filter = async (req, res) => {
  try {
    // Call instance method
    const users = new User();
    const data = await users.filter(req.body).find({ status: 1 });
    res.status(200).send({ data: data });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

UserController.delete = async (req, res) => {
  User.deleteOne({ _id: req.params.id }).exec((err) => {
    if (err) {
      res.status(500).send({ message: "Something went wrong!" });
    } else {
      res.send({ message: "User deleted  successfully!" });
    }
  });
};

module.exports = UserController;
