// Backend: Controller
import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';

const getAttendanceDtl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Retrieve the id from req.params
    console.log("Entered student", id);           
    
    // Find the student by email
    const student = await Student.findOne({ email: id });
    console.log("student",student)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const attendance = student.attendance;
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getMarksDtl=asyncHandler(async (req, res) => {
    try {
      const { id } = req.params; // Retrieve the id from req.params
      console.log("Entered student", id);           
      
      // Find the student by email
      const student = await Student.findOne({ email: id });
      
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const exams = student.exams;
      console.log("exams",exams)
      res.status(200).json(exams);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

export { getAttendanceDtl,getMarksDtl };
