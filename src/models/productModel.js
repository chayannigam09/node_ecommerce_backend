import { Schema, model } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new Schema({
    title:{
        type:String,
        required:true,trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    catagory:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    quantity:{type:Number,required:true},
    sold:{
        type:Number,
        default:0,
        select:false//hiding from response
    },
    images:[],
    color:{
        type:String,
        required:true,
    },
    ratings:[{
        star:Number,
        comment:String,
        postedBy:{type:Schema.Types.ObjectId,ref:"User"},
    }],
    totalRatings:{
        type:String,
        default:0
    }
},{timestamps:true});

//Export the model
export default model('Product', productSchema);