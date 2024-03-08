import mongoose from "mongoose";
import validator from "validator"
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter UserName"],
        minLength:[3,"Name must contain 3 letters"],
        maxLength:[3,"Name must contain 30 letters"]
    },
    email:{
        type:String,
        required:[true,"Please enter Email"],
        valdate:[validator.isEmail,"Please enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minLength:[8,"pass must contain 8 letters"],
        maxLength:[33,"Password contain exceeds 30 letters"]
    },
    phone:{
            type:Number,
            required:[true,"Please enter phone"],

    },
    role: {
        type: String,
        required: [true, "Please select a role"],
        enum: ["Job Seeker", "Employer"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

}) 


userS