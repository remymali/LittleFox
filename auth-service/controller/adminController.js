// import asyncHandler from 'express-async-handler'
// import Student from  '../models/studentModel.js'
// import Teacher from '../models/teacherModel.js';
// import User from '../models/userModel.js';


// //get student details
// const getStudents=asyncHandler(async(req,res)=>{
// try {
//     const users= await Student.find({role:"student"});

//     res.status(200).json(users)
// } catch (error) {
//     res.status(400).json({message:error.message})
// }
// })   

// //@des  Register student
// //route POST  post/api/admin/register
// //@access Public
// const studRegister = asyncHandler(async (req, res) => {
//     const { name, email, password,role } = req.body
//     console.log(req.body)
//     const userExist = await Student.findOne({ email })
//     console.log(userExist)

//     if (userExist) {
//         console.log('userexist')
//         res.status(400)
//         throw new Error("User already exists")
//     }

//     const user = await Student.create({
//         name,
//         email,
//         password,
//         role:'student'
//     })
//     await User.create({
//         name,
//         email,
//         password,
//         role:'student'
//     })

//     // await User.create({
//     //     name,
//     //     email,
//     //     password,
//     //     role
//     // })
    
//     if (user) {
//         //generateToken(res,user._id)
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role
//         })
//     }
//     else {
//         res.status(400)
//         throw new Error("Invalid user data")
//     }
// })
// //Teacher

// //get Teacher details
// const getTeachers=asyncHandler(async(req,res)=>{
//     try {
//         const teachers= await Teacher.find({role:"teacher"});
//         console.log("teachers",teachers);
//         res.status(200).json(teachers)
//     } catch (error) {
//         res.status(400).json({message:error.message})
//     }
//     })  
   

    

// export {getStudents,studRegister,getTeachers}