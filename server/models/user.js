import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    selectedFile:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requred:true
    },
    password:{
        type:String,
        required:true
    },
    id:{
        type:String
    }
})
const User=mongoose.model('User',userSchema);
export default User;