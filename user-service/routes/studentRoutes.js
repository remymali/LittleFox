
import express from 'express'
import {getAttendanceDtl,getMarksDtl,saveMessage,getStudentNotice,updatePaidFee,getTeachers,getTeacherById,addRating} from '../controller/studentController.js'
const router=express.Router();


router.get('/studentAttendance/:id',getAttendanceDtl)
router.get('/studentExam/:id',getMarksDtl)
router.get('/studentNotice/:id',getStudentNotice)
router.post('/saveMessage',saveMessage)
router.put('/updatePaidFee/:id',updatePaidFee)
router.get('/teacher',getTeachers)
router.get('/getTeacherById/:id',getTeacherById)
router.post('/addRating',addRating)
export default router 