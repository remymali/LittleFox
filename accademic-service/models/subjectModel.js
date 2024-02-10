import mongoose from "mongoose";

const subjectSchema= new mongoose.Schema({
    subName: {
        type: String,
        required: true,
    },
    subCode: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    }
}, { timestamps: true });

const subject = mongoose.model('subject', subjectSchema);   

export default  subject


