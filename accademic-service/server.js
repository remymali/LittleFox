import express  from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
dotenv.config()
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
connectDB();
const port=process.env.PORT||5000;
import classRoutes from './routes/classRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'

const app=express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser());



app.use((req, res, next) => {
    const signature = req.cookies.jwt;
    console.log(signature);
    console.log(`inside userservice${req.method} ${req.url}`);
    next();
});
app.use('/class',classRoutes)
app.use('/subject',subjectRoutes)
app.use(notFound);   
app.use(errorHandler);
app.get('/',(req,res)=>
    res.send('AuthServer is ready')    
)
app.listen(port,()=>{
    console.log(`Server logged in port ${port}`)   
})      