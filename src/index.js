import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})

connectDB()
.then( ()=> {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    })
    app.on("error",(error)=>{
        console.log(`Error ${error}`)
    })
})
.catch((error)=>{
    console.log(`MongoDB connection failed !! ${error}`)
})










/*
;( async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error", (error)=>{
        console.log(error,"Database cannot talk to server");
        throw error
       })

       app.listen(process.env.PORT, ()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
       })
    } catch (error) {
        console.error("Error : ", error)
        throw error
    }
})() // IIFE */