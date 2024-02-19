import asyncHandler from 'express-async-handler'
import notice from '../models/noticeModel.js'
import axios from 'axios'



//get class details
const getNotice = asyncHandler(async (req, res) => {
    try {

        const notice = await notice.find();
        res.status(200).json(notice)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//add notice
//route post post/api/Notice/addNotice
const addNotice = asyncHandler(async (req, res) => {
    try {
        console.log("jhjfsd");
        const { title, details, date, sender } = req.body;
        console.log("req.body",req.body)
        // Check if a notice with the same title and date already exists
        const noticeExist = await notice.findOne({ title, date });
        if (noticeExist) {
            res.status(400).json({ message: "Notice already exists" });
            return;
        }
        
        // Create a new notice document
        const newNotice = await notice.create({
            title,
            details,
            date,
            sender: {
                senderId: sender._id,
                email: sender.email,
                role: sender.role
            },
        });

        // Save the new notice document
        await newNotice.save();

        // Respond with the newly created notice
        res.status(201).json(newNotice);
    } catch (err) {
        // Handle any errors
        res.status(500).json({ message: err.message });
    }
});

export default addNotice;


export { getNotice, addNotice }