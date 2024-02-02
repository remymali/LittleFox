import express from 'express'
const router=express.Router()
import { authUser,registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,verifyOTP } from '../controller/authController.js';
import {protect} from '../middleware/authMiddleware.js'

router.post('/login',authUser)
router.post('/verifyOTP',verifyOTP)
router.post('/register',registerUser)      
router.post('/logout',logoutUser)
// router.get('/profile',protect,getUserProfile)
// router.post('/editProfile',protect,updateUserProfile)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);


export default router;