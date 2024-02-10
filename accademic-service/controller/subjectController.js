import asyncHandler from 'express-async-handler'
import Subject from '../models/subjectModel.js'
import axios from 'axios'

//get class details
const getSubject=asyncHandler(async(req,res)=>{
    try {
    
        const subject= await Subject.find();
        console.log("subject",subject)
        res.status(200).json(subject)
    
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    })   
// add subject
//route  post/api/subject/addsubject
const addSubject=asyncHandler(async(req,res)=>{
    try {
        const {name,subCode,teacher}=req.body
        const subjectExist = await Subject.findOne({subName:name})
        if(subjectExist)
        {   
            console.log("Subject already exist")
            res.status(400)
            throw new "Subject already exist."
        }
       const newSubject=await Subject.create({
        subName:name,
        subCode,
        teacher
       })

       newSubject.save();
       if(newSubject)
       {
        res.status(201).json({
            _id: newSubject._id,
            name: newSubject.subName,
            subCode: newSubject.subCode,
            teacher: newSubject.teacher
        })
       }
       else{
        res.status(400)
            throw new Error("Invalid user data")
       }
    } catch (error) {
        res.status(500).json(error);
    }

})

// add subject
//route  patch/api/subject/editSubject
const editSubject=asyncHandler(async(req,res)=>{
    try {
        const subject = await Subject.findOne({ _id: req.body.id });
        if (!subject) {
            res.status(404);
            throw new Error('Subject not found');
        }
        // Update class properties with the provided data
        subject.subName = req.body.data.subName || subject.subName;
        subject.subCode = req.body.data.subCode || subject.subCode;
        subject.teacher = req.body.data.teacher || subject.teacher;

        // Save the updated class
        const updatedSubject = await subject.save();
        res.status(200).json(updatedSubject); // Respond with the updated class data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
    export {getSubject,addSubject,editSubject}