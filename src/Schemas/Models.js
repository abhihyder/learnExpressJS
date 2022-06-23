const mongoose = require("mongoose");
const userSchema = require("./UserSchema");

const models = {};

models.User = new mongoose.model("User", userSchema);

module.exports = models;
