import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req,res)=> {
//  register user process : 
//  creating a new account so : first mail, name and password
//  or signup via google 
// my model has : userName, emai, password, fullName, avatar, coverPage 
// validation - info is not empty smhw
// check if user already exists: check userName and email
// files - avatar and coverImage
// upload them to cloudinary, avatar in backend received or not
// then create entry in db
// 

    res.status(200).json({
        message: "ok"
    })

const {fullName, email, username, password} = req.body
console.log(`email is ${email}`)

})

export {registerUser}