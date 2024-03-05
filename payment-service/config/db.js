import mongoose,{mongo}from "mongoose";
const connectDB= async()=>{
    try {
    const connec=await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo db connected${connec.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB