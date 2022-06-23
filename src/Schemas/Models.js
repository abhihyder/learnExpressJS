const mongoose = require("mongoose");
const userSchema = require("./UserSchema");
const postSchema = require("./PostSchema");

const models = {};

models.User = new mongoose.model("User", userSchema);
models.Post = new mongoose.model("Post", postSchema);

module.exports = models;
