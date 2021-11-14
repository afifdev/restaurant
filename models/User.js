const mongoose = require("mongoose");
const Int32 = require("mongoose-int32").loadType(mongoose);

const User = new mongoose.Schema({
  username: String,
  password: String,
  role: Number,
  name: String,
  balance: {
    type: Int32,
    min: 0,
  },
  cart: [String],
});

module.exports = mongoose.models.User || mongoose.model("User", User);
