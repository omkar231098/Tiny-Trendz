const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  name: String,
  img:String,
  price: Number,
  userID:String,
  quantity:Number
});

const CartModel = mongoose.model("cart", CartSchema);
module.exports = { CartModel };