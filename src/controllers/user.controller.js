import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


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

    const existedUser = await User.findOne({
        $or: [ {email} , {username} ]       // some typa shit here bro $or is a special keyword here which checks the given things same or not in DB
    })

    if(existedUser){
        throw new ApiError(409,"Username or email already exists")
    }

    // file management (coverImage and avatar)

    const avatarLoaclPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLoaclPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLoaclPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatarLoaclPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // Here down we creating a object of user in DB
   const user =  await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registetring the user")
    }

    // final part of returning response

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Sucessfully")
    )
})

export {registerUser}