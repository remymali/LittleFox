import jwt from 'jsonwebtoken'
import asycHandler from "express-async-handler"

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