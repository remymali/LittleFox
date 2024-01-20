// utils/otpGenerator.js
import crypto from 'crypto';

const generateOTP = () => {
    let otp=crypto.randomInt(100000, 999999).toString();
    console.log("otp>>",otp)
  // Generate a secure 6-digit random OTP
  return otp
};

export default generateOTP;
