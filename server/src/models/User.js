import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true

        },
        Password:{
            type:String,
            required:true
        },
        Address:{
            House:{
                type:String,
                required:true
            },
            Neighbourhood:{
                type:String,
                required:true
            },
            City:{
                type:String,
                required:true
            },
            District:{
                type:String,
                required:true
            },
            Pincode:{
                type:Number,
                required:true
            },
            State:{
                type:String,
                required:true
            },
            Country:{
                type:String,
                required:true
            },
            Role:{
                type:String,
                enum:["buyer","seller"],
                required:true
            }
        }
    },{timestamps: true}
);

export const User=mongoose('User',userSchema);