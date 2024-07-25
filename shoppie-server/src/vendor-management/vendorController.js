
const Vendor = require("./vendorSchema");
const Customer = require("../user-management/userSchema");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { vendorValidation } = require("./vendorValidation");

const registerVender = asyncHandler(async (req, res, next) => {
  const { name, email, address, password } = req.body;

  // Validate the input
  const Invalid = vendorValidation(req.body);
  if (Invalid) {
    console.log("Invalid input:", Invalid);
    return res.status(400).json(Invalid);
  }

  try {
    // Check if the email already exists in Vender or Customer collections
    const userExists = await Vendor.findOne({ email });
    const venderExists = await Customer.findOne({ email });
    if (userExists || venderExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate vendId
    const vendId = `SHP${shortid.generate()}`;
    console.log("Generated vendId:", vendId);

    // Create new vender
    const newVendor = new Vendor({
      name,
      email,
      address,
      password: hashedPassword,
      userType: 1,
      vendId,
    });

    // Save new vender to the database
    await newVendor.save();
    console.log("New vender:", newVendor);

    // Respond with success
    res
      .status(201)
      .json({ message: "Vender successfully registered", vender: newVendor });
  } catch (err) {
    console.error("Error during registration:", err);
    next(err); // Pass the error to the next middleware (e.g., error handler)
  }
});

module.exports = {
  registerVender,
};
