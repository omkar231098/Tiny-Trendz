const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  name: String,
  img:String,
  price: Number,
  category:String,
  brand:String,
  color:String,
  age:Number,
  quantity:Number,
  sleeve:String,
  neck:String,
  type:String,
  pattern:String,
  material:String,
  gender:String,
  userID:String,
 
});

const CartModel = mongoose.model("cart", CartSchema);
module.exports = { CartModel };