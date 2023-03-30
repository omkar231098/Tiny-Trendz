const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  name: String,
  mobile:Number,
  email:String,
  password: String
});

const AdminModel = mongoose.model("admin", AdminSchema);
module.exports = { AdminModel };
