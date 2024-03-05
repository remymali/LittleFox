import express from 'express'
import {getStudents,addAttendance,addMarks} from '../controller/teacherController.js'


const router=express.Router();

router.use((req, res, next) => {
    //const signature = req.cookies.jwt;
    //console.log(signature);
    console.log(`inside teacher${req.method} ${req.url}`);
    next();
});
router.get('/student/:id',getStudents)
router.post('/attendance',addAttendance)
router.put('/Marks',addMarks)

export default router