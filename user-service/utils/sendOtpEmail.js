// utils/sendOtpEmail.js
import nodemailer  from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {      
    user:  "littlefox3130@gmail.com", // email
    pass:  "xkqt qjpm wwgo fpum", // email password
  },
});
    
const sendOtpEmail = (email, otp) => {
    console.log(email,otp)
  const mailOptions = {
    from: "littlefox3130@gmail.com",
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}. This OTP is valid for a short duration.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'littlefox3130@gmail.com',
//       pass: 'xkqt qjpm wwgo fpum'
//     }
//   });
//   const sendOtpEmail = () => {
//   var mailOptions = {
//     from: 'littlefox3130@gmail.com',
//     to: 'remy.nisam@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// }
 export default sendOtpEmail;
    