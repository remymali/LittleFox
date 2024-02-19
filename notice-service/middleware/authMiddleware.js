import jwt from 'jsonwebtoken'
import asycHandler from "express-async-handler"
import Student from '../models/studentModel.js'
import Admin from '../models/adminModel.js'
import Teacher from '../models/teacherModel.js'

const protect=asycHandler(async (req,res,next)=>{
    let token;
    token=req.cookies.jwt;
    console.log("token",token)
    if(token)
    {
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET )
            console.log("decoded",decoded)
            const email=decoded.email
            if(decoded.role==='admin')
            req.user= await Admin.findOne({email}).select('-password')
            if(decoded.role==='student')
            req.user= await Student.findOne({email}).select('-password')
            if(decoded.role==='teacher')
            req.user= await Teacher.findOne({email}).select('-password')

            console.log("req.user",req.user)
            next()
        }
        catch(error)
        {
            req.status(401);
            throw new Error('Not authorized, invalid token')

        }
    }
    else{
    
        req.status(401);
        throw new Error('Not authorized, no token')
    }
})

const isAdmin=asycHandler((req,res,next)=>{
if(req.user.role==="admin")
{
    next();
}
else{
    req.status(401);
    throw new Error('Not authorized, no token')
}
})
export { protect,isAdmin };