const router = require("express").Router();
const users = require("../models/user.js");
const ErrorHandler= require("../utilis/ErrorHandler.js")
const jwt = require("jsonwebtoken");
const bcrypt= require("bcryptjs");



// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'
// import users from '../models/auth.js'
router.post("/signup", async (req, res,next) => {
    const { name, email, password} = req.body;
    try{
        const existingUser = await users.findOne({ email: req.body.email});

        if(existingUser){
            return res
          .status(400)
          .json({ success: false,message: "Sorry a User with this email already exists" });
        }
        
        // hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password , salt);
        req.body.password= hashedPassword;

        // create new user
        
        const newUser = await users.create({
            name,
            email,
            password
           
        });

        res.status(200).json({ success: true, message: "User created successfully", data: newUser })

    }
    catch(error){
        return next(new ErrorHandler(error.message, 500));
    }
})



router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    try{

        const existingUser = await users.findOne({ email });

        if(!existingUser){
            return res
            .status(400)
            .json({ success:false, message: "Please Login with correct credentials"})
        }
      
        // compare password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res
              .status(400)
              .json({success: false  ,message: "Please Login with correct credentials" });
        }

        // generating password
        // const token = jwt.sign({ id: existingUser._id}, process.env.JWT_MESSAGE, { expiresIn: '1h'});
         
        
        res.status(200).json({success: true, message:"User logged successfully", data: existingUser})
    }
    catch(error){
        return next(new ErrorHandler(error.message, 500));
    }
})


module.exports= router;