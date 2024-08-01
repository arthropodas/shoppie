const Customer = require("./userSchema");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { validateLoginForm } = require('../utils/validation');
require('dotenv').config(); 
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/tokens");
const{mailOptions,transporter} = require('../utils/Email/emailConfig')

// USER REGISTRATION

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, dob, gender, address, password } =
    req.body;
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

      try{
        const verifiedUser = await Customer.findOne({email, isVerified:1})
        if(verifiedUser){
          return res.status(400).json({ message: "Email already exist" });
        }try{
          const  userNotVerified  = await Customer.findOne({email, isVerified:0})
         
            if(userNotVerified){
                          
              return res.send(await sendEmail(userNotVerified))
            }else{
              const cus = await newCustomer.save();
              return res.send(await sendEmail(cus))
            }
           
          
        }catch(err){
          console.log(err);
        }
      }catch(err){
          console.log(err);
        }    
 
  
});


// EMAIL VERIFICATION 

const verifyEmail =async(req,res)=>{
  const {id} = req.params;
  console.log(id);
 
  try{
    const user = await Customer.findOne({cust_id:id,isVerified:0})
    if(user){
    user.isVerified=1;
        await user.save();
        return res.status(200).send({msg:'Email verified'})
    }else{
      return res.status(400).send({msg:'Email already verified'})
    }
    
  }catch(error){
    console.log(error);
  }
 
}

// SENDING EMAIL 

const sendEmail =async(newCustomer,req,res)=>{

  console.log("customer id ",newCustomer);

 try{
  const options = mailOptions(newCustomer)
  console.log(options);
   const result = await transporter.sendMail(options)
    if(result){
      
      console.log("result from mail :",result);
      return { message: 'Please check you mail to verify',cust_id:newCustomer.cust_id}
    }else{
      return { message: 'Error sending email'}
    }
 }catch(error){
  return res.send('error')
 }
}


// USER LOGIN

const login =async(req,res)=>{
  
  const result= validateLoginForm(req.body)
    if (result){
      return res.status(400).send(result);
    }
    const customer = await Customer.findOne({email:req.body.email,isVerified:1})
    if(!customer){
      return res.status(404).json({errorCode:'E101', msg:"User not found"})
    }
    if(await bcrypt.compare(req.body.password, customer.password)){
     
      console.log(customer);
      const token = generateToken(customer);
      return res.status(200).send(token)
  

}else{
  return res.status(404).json({errorCode:'E102',msg:"Invalid credentials"})
}     

}

// REFRESH TOKEN

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

// GOOGLE SIGNIN

const googleSignIn = async(req,res)=>{

  const {email,firstName}= req.body
  const customer = await Customer.findOne({email})
  if(customer){
    const token = generateToken(customer);

    return res.status(200).send(token);
 
  }else{
    const newCustomer = new Customer({
      firstName,
      email,
    });
    
   try{
    const response = await newCustomer.save();
    const token = generateToken(response);
    return res.status(200).send(token);
   }catch(err){
    return res.status(400).send(err);
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


// FORGOT PASSWORD 




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



module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  login,
  refresh,
  googleSignIn,getUserByEmail,
  verifyEmail
};
