import asyncHandler from 'express-async-handler'
import Student from  '../models/studentModel.js'
import Teacher from '../models/teacherModel.js';
import axios from 'axios'



//get student details
const getStudents = asyncHandler(async (req, res) => {
    try {
        console.log("hai");
        const {selectedClass} = req.query; // Access the selected class from query parameters

        console.log("selectedClass",selectedClass);
        const users = await Student.find({ class:selectedClass });
        
        console.log("users",users);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});  
// const getStudents = asyncHandler(async (req, res) => {
//     try {
//       const { selectedClass, page, limit } = req.query; // Access query parameters
//       console.log("req.query",selectedClass);
//       const currentPage = parseInt(page) || 1; // Convert to integer, default to page 1 if not provided
//       const itemsPerPage = parseInt(limit) || 10; // Convert to integer, default to 10 items per page if not provided
  
//       // Calculate pagination offsets
//       const startIndex = (currentPage - 1) * itemsPerPage;
//       const endIndex = currentPage * itemsPerPage;
  
//       // Query database to get total count of students in the selected class
//       const totalCount = await Student.countDocuments({ class: selectedClass });
  
//       // Fetch paginated students data from database
//       const classes = await Student.find({ class: selectedClass }).skip(startIndex).limit(itemsPerPage);
//        console.log("students",classes)
//       // Construct response object with paginated data and metadata
//       res.status(200).json(classes);
  
      
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
  
   
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
        console.log('userexist')
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
        await axios.post('http://localhost:8001/auth/register', {
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
//Teacher

//get Teacher details
const getTeachers=asyncHandler(async(req,res)=>{
    try {
        const teachers= await Teacher.find({role:"teacher"});
        console.log("teachers",teachers);
        res.status(200).json(teachers)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    })  
   
//@des  Register teacher
//route POST  post/api/admin/register
//@access Public
const teachRegister = asyncHandler(async (req, res) => {
    const { name, email, password,role } = req.body
    console.log(req.body)
    const userExist = await Teacher.findOne({ email })
    console.log(userExist)

    if (userExist) {
        console.log('userexist')
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
        await axios.post('http://localhost:8001/auth/register', {
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
        console.log("student",student)
        if(student)
        {
        student.isBlocked=true;
        await student.save();
        try {
            await axios.put('http://localhost:8001/auth/isBlocking', {
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
    console.log("student",student)
    if(student)
    {
    student.isBlocked=false;
    await student.save();
    try {
        await axios.put('http://localhost:8001/auth/isnonBlocking', {
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


export {getStudents,studRegister,getTeachers,teachRegister,disableStudent,enableStudent}