import express from 'express';
import {isAdmin, protect} from '../middleware/authMiddleware.js'
import {getStudents,studRegister,getTeachers} from '../controller/adminController.js'

const router =express.Router();
router.get('/users',protect,isAdmin,getStudents);
router.post('/users',protect,isAdmin,studRegister);
router.get('/teacher',protect,isAdmin,getTeachers);


export default router;       