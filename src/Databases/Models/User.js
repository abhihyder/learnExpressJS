const mongoose = require("../mongoose");
const schema = require("../Schemas/UserSchema");

module.exports = new mongoose.model("User", schema);