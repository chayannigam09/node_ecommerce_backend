import { Schema, model } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    numView:{
        type:Number,
        default:0
    },
    isLiked:{
        type:Boolean,
        default:false
    },
    isDisliked:{
        type:Boolean,
        default:false
    },
    likes:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    dislikes:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    images:[],
    author:{
        type:String,
        default:"Admin"
    },
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
}
);

//Export the model
export default model('Blog', blogSchema);