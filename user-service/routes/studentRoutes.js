
import express from 'express'
import {getAttendanceDtl,getMarksDtl,saveMessage,getStudentNotice,updatePaidFee} from '../controller/studentController.js'
const router=express.Router();


router.get('/studentAttendance/:id',getAttendanceDtl)
router.get('/studentExam/:id',getMarksDtl)
router.get('/studentNotice/:id',getStudentNotice)
router.post('/saveMessage',saveMessage)
router.put('/updatePaidFee/:id',updatePaidFee)
export default router