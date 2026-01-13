import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Brand:{
        type:String,
        required:true
    },
    Stock:{
        type:Number,
        required:true

    },
    Image:{
        url:{
            type:String,
            required:true
        }
    },
    Rating:{
        type:Number,
        default:0,
        min:[1, 'Rating must be at least 1'],
        max:[5, 'Rating cannot be more than 5'],
        set: val=>Math.round(val*10)/10
    },
    numReview:{
        type:Number,
        default:0
    }
},{timestamps: true})

export const Product=mongoose('Product',productSchema)