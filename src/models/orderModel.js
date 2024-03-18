import { Schema, model } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new Schema({
    products:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:"Product"
            },
            count:Number,
            color:String
        }
    ],
    paymentIntent:{},
    orderStatus:{
        type:String,
        default:"Not Processed",
        enum:["Not Processed","Cash on Delivery", "Processing", "Dispatched", "Cancelled", "Delivered"],
    },
    orderBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
},{timestamps:true});

//Export the model
export default model('Order', orderSchema);