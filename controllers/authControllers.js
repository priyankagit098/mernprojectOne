import User from "../models/Users.js";
import { StatusCodes } from "http-status-codes"; 
    
import {BadRequestError} from "../errors/index.js";


// extending err class













const register = async (req, res,next) => {
    // try {
    //  const data= await new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    //  });
    //  const val = data.save();
    // //  res.send("posted");
    // res.status(201).json({data});
      
        
    // } 
    
    
    
    
    
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        // invoke custom API Error
        throw new BadRequestError("Please provide all values")

    }


    const userAlreadyExists = await User.findOne({email});
    
   
    
    
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use")
    }
    
        const user = await User.create({name,email,password})
        const token= user.createJWT()
        res.status(StatusCodes.CREATED).json({name:user.name, email:user.email, lastname:user.lastname, location: user.location}, token)

    
    
   
}

const login = async (req, res) => {
    res.send("login user");
}

const updateUser = async (req, res) => {
    res.send("update user");
}

export {
    register, login, updateUser
}