import asyncHandler from 'express-async-handler'
import Student from  '../models/studentModel.js'
import Teacher from '../models/teacherModel.js';
import axios from 'axios'



//get student details
const getStudents = asyncHandler(async (req, res) => {
    try {
        const {selectedClass} = req.query; // Access the selected class from query parameters

      
        const users = await Student.find({ class:selectedClass });
        
        
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});  
  

//get student details
const studentDtl = asyncHandler(async (req, res) => {
    try {
             
        const students = await Student.find();     
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});     

//@des  Register student
//route POST  post/api/admin/register
//@access Public
const studRegister = asyncHandler(async (req, res) => {
    // console.log("req.body>>",req.body)
    // console.log("req.file>>",req.file) 
    const { name, email, password,file,sclass} = req.body
    const userExist = await Student.findOne({ email })
    //console.log("userExist",userExist)
    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await Student.create({
        name,
        email,
        password,
        role:'student',
        profileImg:  req.file.filename,
        class:sclass
    })

    try {
        await axios.post('http://localhost:8004/auth/register', {
            name,
            email,
            password,
            role: 'student'
        });
    } catch (error) {
        console.error('Error sending user information to another service:', error.message);
        // Handle error as needed
    }
    
    if (user) {
        //generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//edit student
//@des  edit student
//route POST  POST/api/admin/editStudent
const editStudent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const email = req.body.email;
        const name = req.body.name;  
        //console.log("length",name.length)
        // Check if a student with the given ID exists
        const studentExist = await Student.findOne({ _id: id });
        if (!studentExist) {
            res.status(404).json({ message: "Student not found" });
            throw new Error('Student not found');
        }

        // Update name and email if provided in the request body 
        if ( email !=='undefined')
        {
            studentExist.email = email;
        }
        if ( name !== 'undefined')
        {
            studentExist.name = name;
        }

        // Check if a file is uploaded (profileImg)
        if (req.file) {
            // Update profileImg with the filename (assuming multer saves the uploaded file as 'filename')
            studentExist.profileImg = req.file.filename;
        }

        // Save the updated student
        const updatedStudent = await studentExist.save();

        res.status(200).json(updatedStudent); // Respond with the updated student data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


  
  
//Teacher

//get Teacher details
const getTeachers=asyncHandler(async(req,res)=>{
    try {
        console.log("hai")
        const teachers= await Teacher.find({role:"teacher"});
        res.status(200).json(teachers)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    })  
   

//edit teacher
//@des  edit teacher
//route POST  POST/api/admin/editTeacher
const editTeacher = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const email = req.body.email;
        const name = req.body.name;  
        //console.log("req.body.email",req.body.email)
        // Check if a student with the given ID exists
        const teacherExist = await Teacher.findOne({ _id: id });
        if (!teacherExist) {
            res.status(404).json({ message: "Teacher not found" });
            throw new Error('Teacher not found');
        }

        
        teacherExist.email =  req.body.email||teacherExist.email;
       
        teacherExist.name = name || teacherExist.name
        

       

        // Save the updated student
        const updatedTeacher = await teacherExist.save();

        res.status(200).json(updatedTeacher); // Respond with the updated student data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//@des  Register teacher
//route POST  post/api/admin/register
//@access Public
const teachRegister = asyncHandler(async (req, res) => {
    const { name, email, password,role } = req.body
    
    const userExist = await Teacher.findOne({ email })
    

    if (userExist) {
        
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await Teacher.create({
        name,
        email,
        password,
        role:'teacher'
    })

    try {
        await axios.post('http://localhost:8004/auth/register', {
            name,
            email,
            password,
            role: 'teacher'
        });
    } catch (error) {
        console.error('Error sending user information to another service:', error.message);
        // Handle error as needed
    }
    
    if (user) {
        //generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})
//disable student
//route PUT  put/api/admin/disableStudent/:id
const disableStudent=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const student =await Student.findById({_id:id})
        
        if(student)
        {
        student.isBlocked=true;
        await student.save();
        try {
            await axios.put('http://localhost:8004/auth/isBlocking', {
             isBlocked:true,
             email:student.email
            });
        } catch (error) {
            console.error('Error sending user information to another service:', error.message);
            // Handle error as needed
        }
        res.status(200).json({message:"Success"})
        }
        else
        {
            res.status(404).json({message:"Student not found"})
        }
    } catch (error) {
        console.log("Error",error)
    }

})
//enableStudent
//enable student
//route PUT  put/api/admin/enableStudent/:id
const enableStudent=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const student =await Student.findById({_id:id})
    
    if(student)
    {
    student.isBlocked=false;
    await student.save();
    try {
        await axios.put('http://localhost:8004/auth/isnonBlocking', {
         isBlocked:false,
         email:student.email
        });
    } catch (error) {
        console.error('Error sending user information to another service:', error.message);
        // Handle error as needed
    }
    res.status(200).json({message:"Success"})
    }
    else{
        res.status(404).json({message:"Student not found"})
    }
    })


export {getStudents,studRegister,getTeachers,teachRegister,disableStudent,enableStudent,editStudent,editTeacher,studentDtl}