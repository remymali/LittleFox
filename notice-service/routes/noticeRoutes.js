import express from 'express';
import {addNotice} from '../controller/noticeController.js'

const router =express.Router();

router.post('/addNotice',addNotice)

export default router;         