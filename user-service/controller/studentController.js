// Backend: Controller
import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';


const getAttendanceDtl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Retrieve the id from req.params
    
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
  
  const getStudentNotice= asyncHandler(async (req,res)=>{
    try {
      const { id }=req.params
      const student = await Student.findOne({ email: id });
      
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const messages=student.schoolMessages
      res.status(200).json(messages)
    } catch (error) {
      
    }

  })

  const saveMessage = asyncHandler(async (message) => {
    try {
      // Extract data from the message
      const { sender, title, details, date } = message; 
            
      // Find all students   
      const students = await Student.find();
    
      // Loop through each student and update their schoolMessages array
      await Promise.all(students.map(async (student) => {
        student.schoolMessages.push({
          sender: {
            senderId: sender.senderId, // Assuming senderId is provided in the message
            email: sender.email,
            role: sender.role
          },
          title,
          details,
          date: new Date(date)
        });
    
        // Save the updated student document
        await student.save();
      }));

     
     
      console.log('Message saved to all students:', message);
    } catch (error) {
      console.error('Error saving message to all students:', error);
    }
  });
  
  

export { getAttendanceDtl,getMarksDtl,saveMessage,getStudentNotice };
