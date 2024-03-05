import asyncHandler from 'express-async-handler'
import payment from '../models/paymentModel.js'
import axios from 'axios'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import sPayment from '../models/paymentModel.js'


const feePayment = asyncHandler(async (req, res) => {
    try {
        const { paymentdtl, amount, studentId, description, currency } = req.body
        console.log("req.body", req.body)

        const newPayment = new sPayment({
            studentId: studentId._id,
            amount: amount,
            currency: currency,
            paymentDetails: JSON.stringify(paymentdtl),
            description: description

        });

        // Save the new payment to the database
        await newPayment.save();
        const studId=studentId._id;
       // await axios.put('http://localhost:8005/student/updatePaidFee}',{studId})
        res.status(200).json({ message: "Payment successful", isPaid: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!" })
    }
})

//get/studentPaymentDtls
const paymentDetail = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
       // const id = req.params.id; // Correctly extract the id parameter
        const feeDetails = await sPayment.findOne({ studentId: id }).sort({ date: -1 });
        console.log("feeDetails",feeDetails);
        if (!feeDetails) { // Check if feeDetails is not empty
            res.status(404).json({ message: "No fee details found for the student" });
            
        } else {
            res.status(200).json(feeDetails);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

// const paymentVerify = asyncHandler(async (req, res) => {
//     try {

//         const {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature
//         } = req.body

//         const sign = razorpay_order_id + " " + razorpay_payment_id
//         const expectedSign = crypto.createHmac("rem123", process.env.RAZORPAY_KEY_ID)
//             .update(sign.toString())
//             .digest("hex");

//         if (razorpay_signature === expectedSign) {
//             return res.status(200).json({ message: "Payment verified successfully." })
//         }
//         else {
//             return res.status(400).json({ message: "Invalid signature sent!" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error!" })
//     }
// })



export { feePayment, paymentDetail }