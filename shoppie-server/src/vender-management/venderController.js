const Vender = require("./venderSchema");
const Customer = require("../user-management/userSchema")
const shortid = require('shortid');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require('dotenv').config(); 
const asyncHandler = require("express-async-handler");

const registerVender = asyncHandler(async (req, res, next) => {
  const { venderName, email,address, password } = req.body;

  try {

    const userExists = await Vender.findOne({ email });
    const venderExists = await Customer.findOne({email})
    if (userExists || venderExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const shortUuid = shortid.generate();
    const vendId = `SHP${shortUuid}`;
    const newVender = new Vender({
      venderName,
      email,
      address,
      password: hashedPassword,
      userType:1,
      vendId,
    });
    await newVender.save();

    res.status(201).json({ message: 'Vender successfully registered', customer: newVender });
  } catch (err) {
    next(err);
  }
});

module.exports ={
    registerVender
}