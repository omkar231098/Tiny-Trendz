const express = require("express");
const { CartModel } = require("../Model/cart.model");
cartRouter = express.Router();
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/authenticator");


// get routes access all products
cartRouter.get("/", authenticate,async (req, res) => {
  
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  try {
    const product = await CartModel.find({userID:decoded.userID});
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});

// get particular product
cartRouter.get("/:userid", authenticate,async (req, res) => {
  const { userid } = req.params;
  
  try {
    const product = await CartModel.find({ _id: userid });
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});

// post routes to add products in database
cartRouter.post("/add", authenticate, async (req, res) => {
  const payload = req.body;

  try {
    const product = new CartModel(payload);
    await product.save();
    res.status(200).send({ msg: "New Product has been Added in Database" });
  } catch (err) {
    res.status(404).send({ msg: "Not able to add product" });
  }
});

// patch routes to update the product
cartRouter.put("/update/:userid",authenticate, async (req, res) => {
  const { userid } = req.params;
  const payload = req.body;
  try {
    await CartModel.findByIdAndUpdate({ _id: userid }, payload);
    res.status(200).send("Product has been updated");
  } catch (err) {
    res.status(404).send({ msg: "Not able to update" });
  }
});


cartRouter.patch("/update/:userid",authenticate, async (req, res) => {
  const { userid } = req.params;
  const payload = req.body;
  try {
    await CartModel.findByIdAndUpdate({ _id: userid }, payload);
    res.status(200).send("Product has been updated");
  } catch (err) {
    res.status(404).send({ msg: "Not able to update" });
  }
});


// delete route to delete the product
cartRouter.delete("/delete/:userid",authenticate, async (req, res) => {
  const { userid } = req.params;

  try {
    await CartModel.findByIdAndDelete({ _id: userid });
    res.status(200).send("Product has been deleted from cart");
  } catch (err) {
    res.status(404).send({ msg: "Not able to delete" });
  }
});




module.exports = { cartRouter };
