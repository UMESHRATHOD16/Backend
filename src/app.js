import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// use is used for configure and middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json({limit: "16kb"}))  // when json data is recieved this middleware is used 
app.use(express.urlencoded({extended: true, limit:"16kb"}))  // this converts url data into server understandable 
app.use(express.static("public"))   //  some temp file storing (public assets) middleware
app.use(cookieParser())     // just a cookie parser


// routes imports 
import userRouter from "./routes/user.routes.js";

// routes declaration // "use" is a middleware here
app.use("/api/v1/users", userRouter)

export {app}