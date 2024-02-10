import asyncHandler from 'express-async-handler'
import sClass from '../models/sclassModel.js'
import axios from 'axios'



//get class details
const getClass = asyncHandler(async (req, res) => {
    try {

        const sclass = await sClass.find();
        res.status(200).json(sclass)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//add class
//route post post/api/class/addclass
const addClass = asyncHandler(async (req, res) => {
    try {

        const { name, division, teacher } = req.body
        const classExist = await sClass.findOne({ name })
        if (classExist) {
            console.log('classExist')
            res.status(400)
            throw new Error("Class already exists")
        }
        console.log("req.body", req.body)
        const newclass = await sClass.create({
            name,
            division,
            teacher
        })
        await newclass.save();
        if (newclass) {
            res.status(201).json({
                _id: newclass._id,
                name: newclass.name,
                division: newclass.division,
                teacher: newclass.teacher
            })
        }
        else {
            res.status(400)
            throw new Error("Invalid user data")
        }
    } catch (err) {
        res.status(500).json(err);
    }

})

const editClass = asyncHandler(async (req, res) => {
    try {
        console.log("req", req.body);
        const sclass = await sClass.findOne({ _id: req.body.id });
        if (!sclass) {
            res.status(404);
            throw new Error('Class not found');
        }
        console.log("sclass", sclass)
        // Update class properties with the provided data
        sclass.name = req.body.data.name || sclass.name;
        sclass.division = req.body.data.division || sclass.division;
        sclass.teacher = req.body.data.teacher || sclass.teacher;

        // Save the updated class
        const updatedClass = await sclass.save();

        res.status(200).json(updatedClass); // Respond with the updated class data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export { getClass, addClass, editClass }