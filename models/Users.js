import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

// mongoose.set("strictQuery", false);

const UserSchema = new mongoose.Schema({
    name:{
      type: String,
      required: [true, "Please enter your name!"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email:{
      type: String,
      required: [true, "Please enter your email!"],
       validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
       },
       unique: true,

    }, 
    password:{
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: false,
    },
    lastname:{
      type: String,
      // required: [true, "Please enter your name!"],
      minlength: 3,
      maxlength: 20,
      trim: true,
      default: "priyanka"
    },
    location: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "my city",
    }
    
}
   
    
  );

// this is a hook that gets called before we say the document, but not for every method
// it going to trigger it.

  UserSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt)

  })

// from this function return jsonwebtoken
  UserSchema.methods.createJWT= function() {
    return jwt.sign({userId: this._id}, process.env.JWT_MESSAGE, {
      expiresIn: process.env.JWT_LIFETIME,
    })
  }






const User = mongoose.model("User", UserSchema);  

export default User;
