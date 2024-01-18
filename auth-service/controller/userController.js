import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


//@des  Auth user/set token
//route POST  post/api/users/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body
    const user=await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }
    else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

//@des  Register user
//route POST  post/api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,role } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
        console.log('userexist')
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    if (user) {
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }
}

)

//@des  logout user
//route POST  post/api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({ message: 'User logged out' })
})

//@des  get user profile
//route POST  post/api/users/profile
//@access Public
const getUserProfile = asyncHandler(async (req, res) => {
    const user={
        _id:req.user._id,
        name:req.user.name,
        eamil:req.user.email

    }
    res.status(200).json(user)
})

//@des  update user profile
//route POST  post/api/users/updateUserProfile
//@access Public
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};