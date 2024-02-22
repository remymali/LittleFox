import express  from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import { run } from './Kafka/noticeConsumer.js'
dotenv.config()
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
connectDB();
const port=process.env.PORT||5000;
import studentRoutes from './routes/studentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import teacherRoutes from './routes/teacherRoutes.js'

const app=express();
app.use(cors())
app.use(express.json())
//added new 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser());



app.use((req, res, next) => {
    const signature = req.cookies.jwt;
    console.log(signature);
    console.log(`inside userservice${req.method} ${req.url}`);
    next();
});
app.use('/student',studentRoutes)
app.use('/admin',adminRoutes)
app.use('/teacher',teacherRoutes)

app.use(notFound);   
app.use(errorHandler);
app.get('/',(req,res)=>
    res.send('AuthServer is ready')
)
app.listen(port,()=>{
    console.log(`Server logged in port ${port}`)
})   