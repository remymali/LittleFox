import jwt from 'jsonwebtoken'
import asycHandler from "express-async-handler"
import User from '../models/userModel.js'

const protect=asycHandler(async (req,res,next)=>{
    let token;
    token=req.cookies.jwt;
    if(token)
    {
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET )
            req.user= await User.findById(decoded.userId).select('-password')
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