import express from 'express'
import {getStudents,addAttendance,addMarks} from '../controller/teacherController.js'
const router=express.Router();
router.get('/student/:id',getStudents)
router.post('/attendance',addAttendance)
router.put('/Marks',addMarks)

export default router