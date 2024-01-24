import express from 'express';
import {isAdmin, protect} from '../middleware/authMiddleware.js'
import {getStudents,studRegister} from '../controller/adminController.js'

const router =express.Router();
router.get('/users',protect,isAdmin,getStudents);
router.post('/users',protect,isAdmin,studRegister);


export default router;       