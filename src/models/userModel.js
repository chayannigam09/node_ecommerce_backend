import { set, Schema, model } from 'mongoose'; // Erase if already required
import { genSaltSync, hash, compare } from "bcrypt";
import { randomBytes, createHash } from "crypto";
set('strictQuery', false);
// Declare the Schema of the Mongo model
var userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user',
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    cart:{
        type:Array,
        default:[],
    },
    address:{
        type:String
    },
    wishlist:[{ type: Schema.Types.ObjectId,ref:"Product"}],
    refreshToken:{
        type:String
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
},{
    timestamps:true
});
userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = genSaltSync();
    this.password = await hash(this.password,salt);
    next();
})
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await compare(enteredPassword,this.password)
}
userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = randomBytes(32).toString("hex");
    this.passwordResetToken = createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000 //10 minutes
    return resetToken;
}
//Export the model
export default model('User', userSchema);