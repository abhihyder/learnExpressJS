const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },

  status: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});


// static methods-------------- -----
postSchema.statics = {
  active: function () {
    return this.find({ status: 1 });
  },
};

module.exports = postSchema;
