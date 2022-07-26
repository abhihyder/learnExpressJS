const mongoose = require("mongoose");
const subquery = require("mongoose-subquery");


const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(subquery.default);
// static methods-------------- -----
postSchema.statics = {
  active: function () {
    return this.find({ status: 1 });
  },
};

module.exports = postSchema;
