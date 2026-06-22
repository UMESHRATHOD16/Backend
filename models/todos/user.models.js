// creating a blueprint for schema.
// this is user schema : users data will be stored here ( particularly:  username,email and password)
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    username : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password : {
        type: String,
        required: [true, "password is required"],
        unique: true,
    }
},{timestamps: true})

export const User = mongoose.model("User",userSchema);