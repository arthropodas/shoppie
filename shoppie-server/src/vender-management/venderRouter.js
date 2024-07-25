const express = require("express");
const router = express.Router();
const {registerVender,} = require("./venderController");
// const validateToken = require("../auth");
console.log("Inside the authenticationRoutes");

router.route("/register").post(registerVender); 
// router.route("/register").post(registerUser); 


module.exports = router;