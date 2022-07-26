const { User } = require("../../Schemas/Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {};

UserController.index = (req, res) => {
  // Callback pattern query
  User.find({})
    .select({ _id: 0 })
    .sort({ name: 'asc'})
    .exec((err, users) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong!" });
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
          { email: user.email, id: user._id },
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
    console.log(err);
    res.status(500).send({ message: "Something went wrong!" });
  }
};
module.exports = UserController;
