import asyncHandler from 'express-async-handler'
import Student from  '../models/studentModel.js'
import User from '../models/userModel.js';


//get student details
const getStudents=asyncHandler(async(req,res)=>{
try {
    const users= await User.find({});
    res.status(200).json(users)
} catch (error) {
    res.status(400).json({message:error.message})
}
})

export {getStudents}