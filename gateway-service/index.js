import proxy  from 'express-http-proxy'
import express from "express";
import cors from 'cors'
// import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from 'dotenv'
const app= express()

dotenv.config()

const PORT=process.env.PORT||8000
app.use(cors())


app.use('/api/auth-service',proxy('http://localhost:8004'))
app.use('/api/user-service',proxy('http://localhost:8005'))
app.use('/api/accademic-service',proxy('http://localhost:8006'))
app.use('/api/notice-service',proxy('http://localhost:8007'))

// app.use('/api/auth-service',createProxyMiddleware({target:'http://localhost:8001',changeOrigin:true}))
// app.use('/api/user-service',createProxyMiddleware({target:'http://localhost:8002',changeOrigin:true}))
// app.use('/api/finance-service',createProxyMiddleware({target:'http://localhost:8003',changeOrigin:true}))
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})