const express = require("express");
const mongoose = require("mongoose");
const User=require('./Models/User')
const CryptoJS = require("crypto-js");
require("dotenv").config();
const Authrouter = require("./routes/Authrouter");
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connecton Successful"))
  .catch((err) => {
    console.log(err);
  });
app.post('/api/v1/auth/register',async(req,res)=>{
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

// app.use("/api/v1/auth", Authrouter);
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});












