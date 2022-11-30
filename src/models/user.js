const mongoose = require("mongoose");

const Userschema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    profile_picture_url: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", Userschema);
