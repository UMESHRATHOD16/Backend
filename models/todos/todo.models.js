// This is the main field of todo : eg : Movies to watch [ that's it ] --> under we will be getting sub todo [eg: Intestellar, Big hero 6..etc]

import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    complete : {
        type: Boolean,
        default: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subTodo",
        },
    ],  // array of sub-todos

},{timestamps: true})

export const Todo = mongoose.model("Todo",todoSchema);