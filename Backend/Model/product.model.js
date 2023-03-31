const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
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
  gender:String
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = { ProductModel };
