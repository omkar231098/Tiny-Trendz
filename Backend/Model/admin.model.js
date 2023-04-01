const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  name: String,
 
  email:String,
  password: String
});

const AdminModel = mongoose.model("admin", AdminSchema);
module.exports = { AdminModel };
