import express from 'express'
const router =express.Router();
import {getSubject,addSubject,editSubject} from '../controller/subjectController.js'

router.get('/subject',getSubject)
router.post('/addSubject',addSubject)
router.patch('/editSubject',editSubject)

export default router