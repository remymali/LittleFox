import express from 'express';
import {addNotice,getNotice,editNotice} from '../controller/noticeController.js'

const router =express.Router();
router.get('/getNotice',getNotice)
router.post('/addNotice',addNotice)
router.patch('/editNotice',editNotice)

export default router;         