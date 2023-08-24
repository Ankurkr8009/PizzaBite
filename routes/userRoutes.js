// const express = require("express");
// const router = express.Router();
// const User = require("../models/userModel");

// router.post("/register", (req, res) => {
//   const { name, email, password } = req.body;
//   const newUser = new User({ name, email, password });
//   try {
//     newUser.save();
//     res.status(200).json({
//       success: true,
//       message: "Register success",
//     });
//   } catch (error) { 
//     res.status(400).json({
//       message: error, 
//     });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.find({ email, password });
//     if (user.length > 0) {
//       const currentUser = {
//         name: user[0].name,
//         email: user[0].email,
//         isAdmin: user[0].isAdmin,
//         _id: user[0].Id,
//       };
//       res.status(200).send(currentUser);
//     } else {
//       res.status(400).json({
//         message: "Login Failed",
//       });
//     }
//   } catch (error) {
//     res.status(404).json({
//       message: "Something Went wrong",
//     });
//   }
// });

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Register success",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const currentUser = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.status(200).send(currentUser);
    } else {
      res.status(400).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Something Went wrong",
    });
  }
});



router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});
module.exports = router;
