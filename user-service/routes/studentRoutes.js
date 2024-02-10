
import express from 'express'
import {getAttendanceDtl,getMarksDtl} from '../controller/studentController.js'
const router=express.Router();


router.get('/studentAttendance/:id',getAttendanceDtl)
router.get('/studentExam/:id',getMarksDtl)
export default router