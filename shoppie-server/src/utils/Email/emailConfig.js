const nodemailer = require('nodemailer');
const clientBaseURL = process.env.CLIENT;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
  });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: 'score360buzz@gmail.com',
//     subject: 'Please confirm your email',
  
//   };



const mailOptions = (user) => {
    return {
      from: process.env.EMAIL,
      to:user.email,
      subject : 'Email Verification',
      text : `click the link to verify your account http://localhost:3000/emailVerify`
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