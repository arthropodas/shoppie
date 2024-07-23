const Customer = require("./userSchema");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, dob, gender, address, password } =
    req.body;

  try {
    const userExists = await Customer.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const shortUuid = shortid.generate();
    const cust_id = `SHP${shortUuid}`;
    const newCustomer = new Customer({
      firstName,
      lastName,
      email,
      dob,
      gender,
      address,
      password: hashedPassword,
      cust_id,
    });
    await newCustomer.save();

    res
      .status(201)
      .json({
        message: "Customer created successfully",
        customer: newCustomer,
      });
  } catch (err) {
    next(err);
  }
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const customers = await Customer.find();
    console.log(">>>>>>>>>>customers", customers);
    res.status(200).json({ customers });
  } catch (err) {
    next(err);
  }
});

const getUserById = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const customer = await Customer.findOne({ _id: userId });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ customer });
  } catch (error) {
    next(error); // Pass any error to the error handling middleware
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("data from client :", req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Both email and password are required" });
  }
  customer = await Customer.findOne({ email });
  if (customer && (await bcrypt.compare(password, customer.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          custId: customer.cust_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    const refreshToken = jwt.sign(
      {
        user: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          custId: customer.cust_id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "2m",
      }
    );
    return res.status(200).json({ accessToken: accessToken, refreshToken });
  } else {
    return res.status(404).json({ message: "Invalid credentials" });
  }
});
const refresh = asyncHandler(async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      {
        user: {
          firstName: decoded.user.firstName,
          lastName: decoded.user.lastName,
          custId: decoded.user.custId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );

    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});

const googleSignIn = async(req,res)=>{

  const {email,firstName}= req.body
  const customer = await Customer.findOne({email})
  if(customer){
 const accessToken = jwt.sign({
    user:{
        firstName: customer.firstName,
        lastName:customer.lastName,
        custId: customer.cust_id
    }
},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'1m'
})

const refreshToken= jwt.sign({
  user: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      custId: customer.cust_id,
  }
}, process.env.REFRESH_TOKEN_SECRET, {
  expiresIn: '2m'
});

return res.status(200).json({ accessToken:accessToken, refreshToken  });
 
  }else{
    const newCustomer = new Customer({
      firstName,
      email,
    });
   try{
    const response = await newCustomer.save();
    console.log(response);
   }catch(err){
    console.log(err);
   }
  }

}

const getUserByEmail=async(req,res)=>{

  const email = req.body.email
  console.log(email);
  try{
  const result = await Customer.findOne({email})
  console.log("result",result);
  return res.send('ok')}catch(err){
    console.log(err);
  }res.send('no')

}


module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  login,
  refresh,
  googleSignIn,getUserByEmail
};
