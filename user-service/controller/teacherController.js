import asyncHandler from 'express-async-handler'
import Student from '../models/studentModel.js'
import Teacher from '../models/teacherModel.js'
import axios from 'axios';
//get student details
const getStudents=asyncHandler(async(req,res)=>{
    try {
      console.log("hai")
        const {id}=req.params
         
        const teacher=await Teacher.find({email:id})
        console.log("teacher",teacher)
          const classResponse=await axios.get('http://localhost:8006/class/classDtls')
          console.log("classResponse",classResponse)
          const sclass=classResponse.data
          
          
            const classWithTeacher=sclass.find((cls)=>cls.teacher.toString()===teacher[0]._id.toString())
            console.log("classWithTeacher",classWithTeacher)
           const  classId=classWithTeacher._id
            console.log("classId",classId)
        
       
        const users= await Student.find({class:classId,isBlocked:false});
    
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    }) 

//adding attendance     
//route POST  post/api/teacher/attendance
const addAttendance=asyncHandler(async(req,res)=>{
const { date, attendance } = req.body;
  
  // Iterate through each attendance record
  for (const record of attendance) {
    const { studentId, status } = record;
    
    try {
      // Find the student by their studentId and update their attendance record
     const attendanceAdded= await Student.findOneAndUpdate(
        { _id: studentId },
        { $push: { attendance: { date, status } } },
        { new: true } // Return the updated document
      );
      return res.status(200).json(attendanceAdded)
    } catch (error) {
      console.error(`Error adding attendance for student ${studentId}:`, error);
      // Handle error if necessary
    }
  }

})

//adding marks 
//route PUT  put/api/teacher/addMarks
// const addMarks=asyncHandler(async(req,res)=>{
//   const { userId, examName, examDate, subjects } = req.body;
//   console.log("subjects",subjects)
//   try {
//     // Find the student by userId
//     const student = await Student.findOne({ _id: userId });

//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Update the exams field with the new exam details
//     student.exams.push({
//       examName,
//       examDate,
//       subjects: subjects.map(subject => ({
//         subjectId:subject.subjectId,
//         subjectName: subject.subjectName,
//         marks: subject.marks
//       }))
//     });

//     // Save the updated student object
//     await student.save();

//     return res.status(201).json({ message: 'Exam details added successfully' });
//   } catch (error) {
//     console.error('Error adding exam details:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// })

const addMarks = asyncHandler(async (req, res) => {
  const { userId, examName, examDate, subjects } = req.body;
  console.log("subjects",subjects)

  try {
    // Find the student by userId
    const student = await Student.findOne({ _id: userId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create a new exam object
    const newExam = {
      examName: examName,
      examDate: new Date(examDate),
      subjects: subjects.map(subject => ({
        subjectId: subject.subjectId,
        subjectName: subject.subjectName,
        marks: parseInt(subject.marks) 
      }))
    };

    // Add the new exam to the exams array
    student.exams.push(newExam);

    // Save the updated student object
    await student.save();

    return res.status(201).json({ message: 'Exam details added successfully' });
  } catch (error) {
    console.error('Error adding exam details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


    export {getStudents,addAttendance,addMarks}