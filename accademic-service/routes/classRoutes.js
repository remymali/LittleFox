import express from 'express'
const router =express.Router()
import {getClass,addClass,editClass} from '../controller/classController.js'

router.get('/classDtls',getClass),
router.post('/addClass',addClass),
router.patch('/editClass',editClass)

export default router   