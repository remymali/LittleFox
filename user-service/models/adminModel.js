import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require: true,
    },
    role:{
        type:String,
        require: true,
    },
    profileImg: {
        type: String
    },
    otp: {
        type: String,
        default: null,
      },
    isOtpVerified: {
        type: Boolean,
        default: false,
    },
    
},{
    timestamps: true
});

adminSchema.pre('save',async function(next){
    try {
        if (!this.isModified('password')) {
          return next();
        }
    
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
      } catch (error) {
        return next(error);
      }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;