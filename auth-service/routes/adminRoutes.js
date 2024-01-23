import express from 'express';
import {isAdmin, protect} from '../middleware/authMiddleware.js'
import {getStudents} from '../controller/adminController.js'

const router =express.Router();
router.get('/users',protect,isAdmin,getStudents);


export default router;