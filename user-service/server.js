import express  from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config()
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
connectDB();
const port=process.env.PORT||5000;
import adminRoutes from './routes/adminRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import teacherRoutes from './routes/teacherRoutes.js'

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cookieParser());
app.use('/api/admin',adminRoutes)
app.use('/api/student',studentRoutes)
app.use('/api/teacher',teacherRoutes)
app.use(notFound);
app.use(errorHandler);
app.get('/',(req,res)=>
    res.send('UserServer is ready')
)
app.listen(port,()=>{
    console.log(`Server logged in port ${port}`)
})