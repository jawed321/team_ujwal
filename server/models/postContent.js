import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:String,
    content:String,
    name:String,
    creator:String,
    district:String,
    location:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type: [String],
        default:[],
    },
    comments:{
        type:[String],
        default:[]
    },
    postedOn:{
        type:Date,
        default:new Date()
    }
})
const postContent=mongoose.model('postContent',postSchema);
export default postContent;