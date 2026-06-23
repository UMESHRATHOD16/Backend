import mongoose from "mongoose";
import { Product } from "./product.models";

const orderItemSchema = new mongoose.Schema({
    ProductId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantiy:{
        type:Number,
        required:true,

    }
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true,
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    orderItems:{
        type: [orderItemSchema],
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","cancelled","delivered"],
        default:"pending",
        required:true,
    }
},{timestamps:true})

export const Order = mongoose.model("Order",orderSchema);