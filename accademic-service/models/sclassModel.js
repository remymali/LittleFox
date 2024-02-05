import mongoose from "mongoose";

const sclassSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    division:{
        type:String,
        require: true,
    },
    teacher: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Teacher'
    },
   
    
},{
    timestamps: true
});



const sClass = mongoose.model('sClass', sclassSchema);

export default sClass;