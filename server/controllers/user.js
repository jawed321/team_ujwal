import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import postContent from "../models/postContent.js";

export const signin=async (req,res)=>{
    const {email, password}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser){
            res.status(404).json({message:"email doesnt exist"});
        }else{
            const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
            if(!isPasswordCorrect){
                res.status(400).json({message:"invalid Password"});
            }else{
                const token =jwt.sign({email: existingUser.email, id:existingUser._id},'test', { expiresIn: "1h"})
                res.status(200).json({result:existingUser, token});
            }
        }
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
}
export const signup=async (req,res)=>{
    const {firstName,lastName,aadhar,email,password,confirmPassword,selectedFile}=req.body;
    try {
        const existingUser=await User.findOne({email});
        const existingaadhar=await User.findOne({aadhar});
        if(existingaadhar){
            res.status(400).json({message:"card no. already exist"});  
        }
        //console.log(existingUser._id.toString());
        if(existingUser!==null) return res.status(400).json({message:"email already exist"});
        if(password!==confirmPassword) return res.status(400).json({message:"Password doesnt match"});
        const hashedPassword=await bcrypt.hash(password, 12);
        const result= await User.create({name:`${firstName} ${lastName}`,aadhar,email,password:hashedPassword,selectedFile})
        const token =jwt.sign({email: result.email, id:result._id},'test', { expiresIn: "1h"})
        res.status(200).json({result, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"});
    }
}
export const updateProfile=async (req,res)=>{
    const {firstName,lastName,email,selectedFile}=req.body;
    const id=req.userId;
    try {
        const existingUser=await User.findOne({email});
        if(existingUser!==null && existingUser._id.toString()!==req.userId) return res.status(400).json({message:"email already exist"});
        const updatedProfile={name:`${firstName} ${lastName}`,email,password:existingUser.password,selectedFile}
        const result = await User.findByIdAndUpdate(id,updatedProfile,{new:true});
        
        await postContent.updateMany({creator:id}, {$set:{name:`${firstName} ${lastName}`}})
        //const result= await User.create({name:`${firstName} ${lastName}`,email,password:hashedPassword})
        const token =jwt.sign({email: result.email, id:result._id},'test', { expiresIn: "1h"})
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
}
export const changePassword=async (req,res)=>{
    const {password,confirmPassword}=req.body;
    const id=req.userId
    try {
        if(password!==confirmPassword) return res.status(400).json({message:"Password doesnt match"});
        const hashedPassword=await bcrypt.hash(password, 12);
        await User.updateOne({_id:id},{$set:{password:hashedPassword}});
        const result= await User.findById(id);
        const token =jwt.sign({email: result.email, id:result._id},'test', { expiresIn: "1h"})
        //console.log(token);
        res.status(200).json({result, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"});
    }
}


export const getUserdetail = async (req, res) => {
    try {
        const Userdetail = await User.findById(req.userId);
        res.json(Userdetail);
    } catch (error) {
        console.log(error)
    }
}