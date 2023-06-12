const mongoose = require("../mongoose");
const schema = require("../Schemas/PostSchema");

module.exports = new mongoose.model("Post", schema);