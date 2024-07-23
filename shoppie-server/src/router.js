const express = require("express");
const router = express.Router();
const authenticationRoutes = require("./user-management/userRouter");
const venderRoutes = require("./vender-management/venderRouter")
const productRoutes = require("./product-management/productRouter")

console.log('Inside the router');

router.use("/users", authenticationRoutes);
router.use("/venders", venderRoutes);
router.use("/products", productRoutes);




module.exports = router;

