const nodemailer = require('nodemailer');
const clientBaseURL = process.env.CLIENT;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
  });


const mailOptions = (user) => {

  const uid=user.cust_id
    return {
      from: process.env.EMAIL,
      to:user.email,
      subject : 'Email Verification',
      text : `click the link to verify your account http://localhost:3000/verifyEmail/${uid}`
    };
  };

  const vendMailOptions = (user,token) => {
    console.log("isnide the vendMail Options..........................")
    return {
      from: process.env.EMAIL,
      to:user.email,
      subject : 'Email Verification',
      text : `click the link to verify your account ${clientBaseURL}/verifyEmail/${token}`
    };
  };
  
  module.exports={transporter,mailOptions,vendMailOptions}