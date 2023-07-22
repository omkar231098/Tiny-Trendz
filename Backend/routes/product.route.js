const express = require("express");
const { ProductModel } = require("../Model/product.model");
productRouter = express.Router();
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/authenticator");


// get routes access all products
productRouter.get("/",async (req, res) => {
  
  
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  try {
    const product = await ProductModel.find();  //{userID:decoded.userID}
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});


// routes for brand filter
productRouter.get("/bran",  async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");

  try {
    let brandsArray = [];
    const { brand } = req.query;

    if (Array.isArray(brand)) {
      brandsArray = brand;
    } else {
      brandsArray.push(brand);
    }

    let query = { brand: { $in: brandsArray } };

    

    const products = await ProductModel.find(query);
    res.status(200).send(products);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});
// routes for sleeve filter
productRouter.get("/slev",  async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");

  try {
    let brandsArray = [];
    const { sleeve } = req.query;

    if (Array.isArray(sleeve)) {
      brandsArray = sleeve;
    } else {
      brandsArray.push(sleeve);
    }

    let query = { sleeve: { $in: brandsArray } };

    

    const products = await ProductModel.find(query);
    res.status(200).send(products);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});

productRouter.get("/patt",  async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");

  try {
    let brandsArray = [];
    const { pattern } = req.query;

    if (Array.isArray(pattern)) {
      brandsArray = pattern;
    } else {
      brandsArray.push(pattern);
    }

    let query = { pattern: { $in: brandsArray } };

    

    const products = await ProductModel.find(query);
    res.status(200).send(products);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});

productRouter.get("/mat",  async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");

  try {
    let brandsArray = [];
    const { material } = req.query;

    if (Array.isArray(material)) {
      brandsArray = material;
    } else {
      brandsArray.push(material);
    }

    let query = { material: { $in: brandsArray } };

    

    const products = await ProductModel.find(query);
    res.status(200).send(products);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});

productRouter.get("/price", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");

  try {
    const { minPrice, maxPrice } = req.query;

    let query = {
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    };

    const products = await ProductModel.find(query);
    res.status(200).send(products);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});













// get particular product
productRouter.get("/:userid", authenticate,async (req, res) => {
  const { userid } = req.params;
  
  try {
    const product = await ProductModel.find({ _id: userid });
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ msg: "Not able to read" });
  }
});

// post routes to add products in database
productRouter.post("/add", authenticate, async (req, res) => {
  const payload = req.body;

  try {
    const product = new ProductModel(payload);
    await product.save();
    res.status(200).send({ msg: "New Product has been Added in Database" });
  } catch (err) {
    res.status(404).send({ msg: "Not able to add product" });
  }
});

// patch routes to update the product
productRouter.put("/update/:userid",authenticate, async (req, res) => {
  const { userid } = req.params;
  const payload = req.body;
  try {
    await ProductModel.findByIdAndUpdate({ _id: userid }, payload);
    res.status(200).send("Product has been updated");
  } catch (err) {
    res.status(404).send({ msg: "Not able to update" });
  }
});

// delete route to delete the product
productRouter.delete("/delete/:userid",authenticate, async (req, res) => {
  const { userid } = req.params;

  try {
    await ProductModel.findByIdAndDelete({ _id: userid });
    res.status(200).send("Product has been deleted");
  } catch (err) {
    res.status(404).send({ msg: "Not able to delete" });
  }
});




module.exports = { productRouter };
