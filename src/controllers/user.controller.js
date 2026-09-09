// STRICTLY COMMENTS ARE USEFULL

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

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
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;      // this shit didnt worked
    // this was to check the cover Image is uploaded or not, if not uploaded then it should return ""

    if(!avatarLoaclPath){
        throw new ApiError(400,"Avatar file is required")
    }

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.lenght > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }   // this is classical code

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

    const createdUser = await User.findById(user._id).select(       // this sh*t of code is something bro
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

const loginUser = asyncHandler(async (req,res) => {
    // todos for login
    // req body -> data
    // check if user exists, userName or email
    // if exists then check password
    // access token and refresh token
    // send AT and RT using cookies (access token and refresh token)


    const {email,username,password} = req.body  // req body data done

    if(!username || !email){
        throw new ApiError(400,"Username or password is required")
    }

    const user = await User.findOne({    // checked if username or email existed in DB or not
        $or: [ { username }, {email} ]          // This typa shit it gold, remember this 
    })

    if(!user){
        throw new ApiError(404,"User does not exists please register")  // this is easy underStandable right !!
    }

    // now check Password :
    const isPasswordValid = await user.isPasswordCorrect(password)   

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid User Credentials")
    }

    // The fucking literally dont get it thing (its undestandable but idk the significance)
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    // the upper Line of code may become expensive while users increase so take care of it
    // I need to underStand my codeBase again brathaaa....

    // Cookies Timeee (biscuuuttsss)

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToke",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User LoggedIn Successfully"
        )
    )



})

const logoutUser = asyncHandler(async(req,res)=>{
     await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
}