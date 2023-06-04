let mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

const User = new mongoose.model("User", userShcema);

module.exports = User;
