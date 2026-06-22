// this will be actuall todo eg: Movie names in "Movies to Watch"

import mongoose from "mongoose"

const subTododSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    complete : {
        type: Boolean,
        default: false,
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

export const subTodo = mongoose.model("subTodo", subTododSchema);