const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
require('dotenv').config()
  
router.post("/register", async (req, res) => {
    try {
    const newUser = new User({
      firstname: req.body.first,
      lastname: req.body.last,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
      console.log(newUser);
      const user = await newUser.save();
      return res.status(200).json(user);
     
    } catch (err) {
      console.log(err);
       return res.status(500).json(err);
    }
  });
module.exports=router;