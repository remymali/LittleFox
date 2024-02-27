import express from 'express'
const router=express.Router()
import { authUser,registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,verifyOTP ,disableUser,forgotPassword,resetPassword,googleLogin} from '../controller/authController.js';
import {protect} from '../middleware/authMiddleware.js'

router.post('/login',authUser)
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword',resetPassword)
router.post('/googleLogin',googleLogin)
router.post('/verifyOTP',verifyOTP)
router.post('/register',registerUser)      
router.post('/logout',logoutUser)
router.put('/isBlocking',disableUser)
// router.get('/profile',protect,getUserProfile)
// router.post('/editProfile',protect,updateUserProfile)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);


export default router;