const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  mobile:Number,
  email:String,
  password: String,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
