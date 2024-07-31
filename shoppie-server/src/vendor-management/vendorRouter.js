const express = require("express");
const router = express.Router();
const {registerVender, verifyEmail,} = require("./vendorController");
console.log("isnde the vender................")
// const validateToken = require("../auth");
console.log("Inside the authenticationRoutes");

router.route("/register").post(registerVender); 
router.route("/verifyEmail").post(verifyEmail);
// router.route("/register").post(registerUser); 


module.exports = router;