import express from 'express'
const router=express.Router()
import { authUser,registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile } from '../controller/userController.js';
import {protect} from '../middleware/authMiddleware.js'

router.post('/auth',authUser)
router.post('/register',registerUser)      
router.post('/logout',logoutUser)
// router.get('/profile',protect,getUserProfile)
// router.post('/editProfile',protect,updateUserProfile)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);


export default router;