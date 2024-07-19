const express = require("express");
const router = express.Router();
const {getAllUsers, registerUser, getUserById, login, refresh} = require("./userController");
const validateToken = require("../auth");
console.log("Inside the authenticationRoutes");

router.route("/get").get(validateToken, getAllUsers); 
router.route("/register").post(registerUser); 
router.route('/getUser').get(getUserById); 
router.route('/login').post(login); 
router.route('/refresh').post(refresh); 

module.exports = router;
    
