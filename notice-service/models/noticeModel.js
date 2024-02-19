import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sender: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },   
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
}],
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sClass'
    }
}, { timestamps: true });

const notice = mongoose.model("notice", noticeSchema);

export default notice;
