const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// Instance methods--------------------
userSchema.methods = {
  filter: function (reqData) {
    const filter = {};
    if (reqData.name) {
      filter.name = new RegExp(reqData.name, 'i');
    }
    if (reqData.status) {
      filter.name = reqData.status;
    }

    return mongoose.model("User").find(filter);
  },
};

// static methods-------------- -----
userSchema.statics = {
  active: function () {
    return this.find({ status: 1 });
  },
};

module.exports = userSchema;
