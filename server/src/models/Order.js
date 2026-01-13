import mongoose from "mongoose";

const orderSchema=new mongooseSchema(
    {
        userRef:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        orderItems:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        Address:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        paymentInfo:{
            method:{
                type:String,
                enum:['UPI','COD']
            },
            upiID:{
                type:String,
                required:function(){
                    return['UPI'].includes(this.method)
                }
            },
            status:{
                type:String,
                default:"Pending"
            },
            paidAt:{
                type:Date,
                required:true
            }
        },
        totalPrice:{
            type:Number,
            default:0.00
        },
        deliveryStatus:{
            type: String,
            enum:["Shipped","Out for Delivery","Delivered","Cancelled"],
            required:true
        }
    },{timestamps:true}
)

export const Order=mongooseSchema('Order',orderSchema)