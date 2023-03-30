const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  img:String,
  price: Number,
  quantity:Number
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = { ProductModel };
