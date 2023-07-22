const express = require("express");
const { UserModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
userRouter = express.Router();
const jwt = require("jsonwebtoken");
// const { authenticate } = require("../middlewares/authenticator");

// post route to register the user

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "Saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// post route to login the user


userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User is not registered yet!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Generate the token
    const token = jwt.sign({ userID: user._id }, "masai", { expiresIn: "3h" });

    // Send the token and username in the response
    res.status(200).json({ msg: "Login successful", token, username: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// get route access the users database
// userRouter.get("/",authenticate, async (req, res) => {
//   try {
//     const user = await UserModel.find();
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(404).send({ msg: "Not able to read" });
//   }
// });

// patch route to update the users
// userRouter.patch("/update/:userid",authenticate, async (req, res) => {
//   const { userid } = req.params;
//   const payload = req.body;
//   try {
//     await UserModel.findByIdAndUpdate({ _id: userid }, payload);
//     res.status(200).send("User has been updated");
//   } catch (err) {
//     res.status(404).send({ msg: "Not able to update" });
//   }
// });

// delete route to delete the user
// userRouter.delete("/delete/:userid",authenticate, async (req, res) => {
//   const { userid } = req.params;

//   try {
//     await UserModel.findByIdAndDelete({ _id: userid });
//     res.status(200).send("User has been deleted");
//   } catch (err) {
//     res.status(404).send({ msg: "Not able to delete" });
//   }
// });









module.exports = { userRouter };
