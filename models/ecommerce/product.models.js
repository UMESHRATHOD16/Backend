import mongoose from "mongoose";
import { Category } from "./category.models";

const productSchema = new mongoose.Schema({
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    productImg : {
        type: String,
    },
    price:{
        type: Number,
        default: 0,
    },
    stock:{
        type: Number,
        default: 0,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps:true})

export const Product = mongoose.model("Product",productSchema);