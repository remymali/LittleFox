import Express  from "express";
const route= Express.Router()
import {feePayment,paymentDetail} from '../controller/paymentController.js'


route.post('/feePayment',feePayment)
route.get('/paymentdtl/:id',paymentDetail)

export default route