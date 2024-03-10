import asyncHandler from 'express-async-handler'
import notice from '../models/noticeModel.js'
import axios from 'axios'
import {saveNoticeAndSendMessage} from '../Kafka/noticeProducer.js'



//get class details
const getNotice = asyncHandler(async (req, res) => {
    try {
        console.log("entered in getnotice")
        const allNotices = await notice.find({});
        console.log("notice",allNotices)
        res.status(200).json(allNotices)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//add notice
//route post post/api/Notice/addNotice
const addNotice = asyncHandler(async (req, res) => {
    try {
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

        // Send message to Kafka topic after successfully saving the notice
        await saveNoticeAndSendMessage(newNotice);

        // Respond with the newly created notice
        res.status(201).json(newNotice);
    } catch (err) {
        // Handle any errors
        res.status(500).json({ message: err.message });
    }
});

const editNotice = asyncHandler(async (req, res) => {
    try {
        console.log("req", req.body);
        const newNotice = await notice.findOne({ _id: req.body.id });
        if (!newNotice) {
            res.status(404);
            throw new Error('Notice not found');
        }
        console.log("newNotice", newNotice)
        // Update class properties with the provided data
        newNotice.title = req.body.data.title || newNotice.title;
        newNotice.details = req.body.data.details || newNotice.details;

        // Save the updated class
        const updatedNotice = await newNotice.save();


        // Send message to Kafka topic after successfully saving the notice
        await saveNoticeAndSendMessage(updatedNotice);
        res.status(200).json(updatedNotice); // Respond with the updated class data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



const allStudents=asyncHandler(async(req,res)=>{

})
export { getNotice, addNotice ,editNotice}