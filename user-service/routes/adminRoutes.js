import express from 'express';
import {isAdmin, protect} from '../middleware/authMiddleware.js'
import {getStudents,studRegister,editStudent,getTeachers,teachRegister,disableStudent,enableStudent, editTeacher,studentDtl} from '../controller/adminController.js'

import multer from 'multer'
import uuidv4 from 'uuidv4'

const router =express.Router();


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'../client/public/profileImg')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})


var upload = multer({
    storage: storage,
    
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //     }
    // }
    
});
router.get('/student',protect,isAdmin,getStudents);
router.post('/register',upload.single('file'),protect,isAdmin,studRegister);
router.post('/editStudent/:id',upload.single('file'),protect,isAdmin,editStudent)
router.get('/teacher',protect,isAdmin,getTeachers);
router.get('/getStudentDtl',protect,isAdmin,studentDtl)
router.post('/editTeacher/:id',protect,isAdmin,editTeacher);
router.post('/teachRegister',protect,isAdmin,teachRegister);
router.put('/disableStudent/:id',protect,isAdmin,disableStudent)
router.put('/enableStudent/:id',protect,isAdmin,enableStudent)


export default router;         