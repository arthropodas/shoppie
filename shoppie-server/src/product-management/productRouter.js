const express = require("express");
const router = express.Router();
const {addProduct} = require("./productController");
const {addProductCategory,getProductDetails} = require("./productController");
// const validateToken = require("../auth");
console.log("Inside the authenticationRoutes");

router.route("/addProduct").post(addProduct); 
router.route("/addCategory").post(addProductCategory); 
router.route("/getProduct").get(getProductDetails); 




module.exports = router;