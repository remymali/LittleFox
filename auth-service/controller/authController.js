import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import otpGenerator from 'otp-generator'
import generateOTP from '../utils/generateOTP.js'
import sendOtpEmail from '../utils/sendOtpEmail.js'
//google login

//verifyOTP
const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body
   // console.log(req.body)

    if (!otp) {
        res.status(400).json({ message: "OTP is required" })
    }
    const user = await User.findOne({ email }).limit(1)
    if (!user) {
        res.status(400).json({ message: "User not found with the provided email" });
        return; // Add a return statement to stop execution
    }
    //console.log(user)
    if(otp!=user.otp)
    {
        res.status(400).json({ message: "OTP verification failed:" })
        return;
    }
    if (otp === user.otp) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: "OTP verification successful"
        })
    }
    else {
        res.status(400).json({ message: "OTP entered is not valid." })
    }
})

//Forgotpassword
//@des  Auth user/Forgotpassword
//route POST  post/api/users/Forgotpassword
const forgotPassword = asyncHandler(async (req, res) => {
    try { //console.log("req.bodyforgot",req.body);
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            console.log("OTP>>", otp);
            user.otp = otp;
            await user.save();
            // Send OTP via email
            sendOtpEmail(req.body.email, otp);
            res.status(201).json({ message: 'OTP sent successfully', key:'forgotpassword' });
           
        } else {
            res.status(404).json({ message: 'Users not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const resetPassword=asyncHandler(async(req,res)=>{
    console.log(req.body.email);
    const user= await User.findOne({email:req.body.email})
    if(!user)
    {
        return res.status(404).json({message:"User not found"})
    }
    else{
        user.password=req.body.password|| user.password 
        const updatedUser=await user.save()
        res.status(200).json({message:"Password Reset Successfully",updatedUser:updatedUser})
    }
})


const googleLogin=asyncHandler(async(req,res)=>{
   // console.log("req",req.body)
    const {email,name}=req.body
    const user = await User.findOne({ email });
   // console.log("user.isBlocked", user.isBlocked);
    
    if (user.isBlocked) {
        //console.log("jshjhsj");
        res.status(401).json({ message: "User is blocked" });
    } else {if (user) {
        generateToken(res, user._id, user.role, user.email);

        // let otp = otpGenerator.generate(6, {
        //     upperCaseAlphabets: false,
        //     lowerCaseAlphabets: false,
        //     specialChars: false,
        // });
        // console.log("OTP>>", otp);
        // user.otp = otp;
        // await user.save();
        // Send OTP via email
        // sendOtpEmail(email, otp);
        res.status(201).json({ message: 'Success',userDtls:user });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
        throw new Error("Invalid email or password");
    }
}
});


//@des  Auth user/set token
//route POST  post/api/users/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
   // console.log("req.body>>", req.body);
    const user = await User.findOne({ email });
    //console.log("user.isBlocked", user.isBlocked);
    
    if (user.isBlocked) {
        //console.log("jshjhsj");
        res.status(401).json({ message: "User is blocked" });
    } else {
        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id, user.role, user.email);

            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            console.log("OTP>>", otp);
            user.otp = otp;
            await user.save();
            // Send OTP via email
            sendOtpEmail(email, otp);
            res.status(201).json({ message: 'OTP sent successfully' });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
            throw new Error("Invalid email or password");
        }
    }
});


//@des  Register user
//route POST  post/api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
        console.log('userexist')
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    if (user) {
        generateToken(res, user._id)
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
}

)

//@des  logout user
//route POST  post/api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
    //console.log("outout")
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User logged out' })
})

//@des  get user profile
//route POST  post/api/users/profile
//@access Public
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        eamil: req.user.email

    }
    res.status(200).json(user)
})

//@des  update user profile
//route POST  post/api/users/updateUserProfile
//@access Public
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//disable student
//route PUT  put/api/admin/disableStudent/:id
const disableUser = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        if (user) {
            user.isBlocked = true;
            await user.save();
            res.status(200).json({ message: "Success" })
        }
        else {
            res.status(404).json({ message: "User not found" })
        }

    } catch (error) {
        console.log("Error", error)
    }

})


export {
    authUser,
    googleLogin,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    verifyOTP,
    forgotPassword,
    resetPassword,
    disableUser
};