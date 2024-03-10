import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
   chatName:{type: String , trim :true},
   isGroupChat :{type:Boolean,default:false},
   users:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }
   ],
   latestMessage:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Message'
   },
   groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
}, { timestamps: true });

const chat = mongoose.model("chat", chatSchema);

export default chat;
