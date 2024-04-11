import express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
dotenv.config()
//import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import {createNotFoundHandler,createErrorHandler} from 'my-error-handlerpackage'

import connectDB from "./config/db.js";
connectDB();
const port=process.env.PORT||5000;
import authRoutes from './routes/authRoutes.js'
//import adminRoutes from './routes/adminRoutes.js'

const app=express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cookieParser());
app.use((req, res, next) => {
    const signature = req.cookies.jwt;
    console.log(signature);
    console.log(`inside authservice${req.method} ${req.url}`);
    next();
});
app.use('/auth',authRoutes)
//app.use('/api/admin',adminRoutes)
app.use(createErrorHandler);
app.use(createNotFoundHandler);
app.get('/',(req,res)=>
    res.send('AuthServer is ready')
)
app.listen(port,()=>{
    console.log(`Server logged in port ${port}`)
})