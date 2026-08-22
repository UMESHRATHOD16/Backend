import mongoose from "mongoose";

userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)

## These 3 lines / steps should followed everywhere