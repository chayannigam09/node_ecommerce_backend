import { Schema, model } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new Schema({
    products:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:"Product"
            },
            count:Number,
            color:String,
            price:Number
        }
    ],
    cartTotal:Number,
    totalAfterDiscount:Number,
    orderBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
},{timestamps:true});

//Export the model
export default model('Cart', cartSchema);