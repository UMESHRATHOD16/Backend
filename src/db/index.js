import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express"

const app = express();

const connectDB = async ()=>{
   try {
    const connetionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connected ! DB Host : ${connetionInstance.connection.host}`)
    app.on(`error`,(error)=>{
        console.log(`Error Database Cannot Connect to Server ${error}`)
    })

    app.listen(process.env.PORT,()=>{
        console.log(`App listening on port ${process.env.PORT}`)
    })
   } catch (error) {
    console.error(`Error ! ${error}`)
    process.exit(1)
   }
}

export default connectDB