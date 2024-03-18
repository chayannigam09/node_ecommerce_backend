import { Schema, model } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var blogCatagorySchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
   
},{timestamps:true});

//Export the model
export default model('BlogCatagory', blogCatagorySchema);