import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.models.js"

const registerUser = asyncHandler(async (req,res)=> {
//  register user process : 
//  creating a new account so : first mail, name and password
// check none of them is empty - Validation
//  or signup via google 
// my model has : userName, emai, password, fullName, avatar, coverPage 
// validation - info is not empty smhw
// check if user already exists: check userName and email
// files - avatar and coverImage
// upload them to cloudinary, avatar in backend received or not
// then create entry in db
// remove password and refresh token fields from response
// check for user creation
// return response

    res.status(200).json({
        message: "ok"
    })

const {fullName, email, username, password} = req.body  // the info is coming from form (f o r m) or body / its not from URL
console.log(`email is ${email}`)
console.log(`username is ${username}`)

   /* if(fullName === ""){
        throw new ApiError(400,"full Name required")

        This piece of code here is used to validate, and its for only fullName,
        and if want to validate other fields it needs multiple if blocks so the other
        piece of code is usefull is used here.
    } */

    if(
        [fullName,email, username, password].some((field)=>{
            return field?.trim() ===""
        })
    ){ throw new ApiError(400,"All fields are Required")}

    const existedUser = User.findOne({
        $or: [ {email} , {username} ]       // some typa shit here bro $or is a special keyword here which checks the given things same or not in DB
    })

    if(existedUser){
        throw new ApiError(409,"Username or email already exists")
    }
})

export {registerUser}