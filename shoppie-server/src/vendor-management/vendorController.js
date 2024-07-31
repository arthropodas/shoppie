// vendorController.js
const Vendor = require("./vendorSchema");
const Customer = require("../user-management/userSchema");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const{vendMailOptions,transporter} = require('../utils/Email/emailConfig')
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { vendorValidation } = require("./vendorValidation");

const registerVender = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate the input
  const invalid = vendorValidation(req.body);
  if (invalid) {
   
    return res.status(400).json(invalid);
  }

  try {
    // Check if the email already exists in the Vendor collection
    const existingVendor = await Vendor.findOne({ email });
    console.log("vendor................mail",existingVendor)
    
    // Handle if vendor already exists and is verified
    if (existingVendor) {
      if (existingVendor.isVerified) {
        console.log("Vendor already exists:", existingVendor);
        return res.status(400).json({ message: "Email user already exists" });
      } else {
        // Vendor exists but is not verified, proceed to re-send the verification email
        await resendVerificationEmail(existingVendor);
        return res.status(200).json({ message: 'Please check your mail to verify' });
      }
    } 

    // If vendor does not exist, create a new vendor
    const hashedPassword = await bcrypt.hash(password, 10);
    const vendId = `SHP${shortid.generate()}`;
    const verificationToken = crypto.randomBytes(20).toString('hex');

    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      userType: '1', // Adjust this as needed
      vendId,
      verificationToken,
    });

    await saveNewVendorAndSendEmail(newVendor, verificationToken);

    res.status(200).json({ message: "Please check your mail to verify", venderId: vendId });

  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
});

// Function to handle sending verification email
const resendVerificationEmail = async (vendor) => {
  const verificationToken = vendor.verificationToken;
  const options = vendMailOptions(vendor, verificationToken);
  
  try {
    await transporter.sendMail(options);
  } catch (err) {
    throw new Error("Failed to send verification email.");
  }
};

// Function to handle saving new vendor and sending email
const saveNewVendorAndSendEmail = async (vendor, verificationToken) => {
  const options = vendMailOptions(vendor, verificationToken);
  
  console.log("New vendor email options:", options);
  
  try {
    await transporter.sendMail(options);
    await vendor.save();
  } catch (err) {
    console.error("Error saving vendor or sending email:", err);
    throw new Error("Failed to register vendor or send verification email.");
  }
};


const verifyEmail = asyncHandler(async (req, res, next) => {
  const {email,token } = req.body
  try {
    const vendor = await Vendor.findOne({ verificationToken: token });

    if (!vendor) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    else if(vendor.email != email){
      res.status(400).json({ message: "Email not matching" ,});

    }

  await Vendor.updateOne(
      { email: email }, // Query to find the document by email
      { $set: { isVerified: true } } // Update operation
    );

    vendor.isVerified = true;
    vendor.verificationToken = undefined; // Clear the token
    await vendor.save();

    res.status(200).json({ message: "Email verified successfully!" ,});
  } catch (err) {

    next(err);
  }
});

module.exports = {
  registerVender,verifyEmail
};
