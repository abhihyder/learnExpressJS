const { User } = require("../../Schemas/Models");

const UserController = {};

UserController.index = (req, res) => {
  User.find({})
    .select({ _id: 0 })
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong!" });
      } else {
        res.send({ data: users });
      }
    });
};

module.exports = UserController;
