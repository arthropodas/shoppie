const express = require("express");
const router = express.Router();
const authenticationRoutes = require("./user-management/userRouter");

console.log('Inside the router');

router.use("/users", authenticationRoutes);

module.exports = router;

