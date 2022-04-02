import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import mongoose from "mongoose";
import express from "express";
import postContent from "../models/postContent.js";

export const signin=async (req,res)=>{
    const {email, password}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser){
            res.status(404).json({message:"email doesnt exist"})
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
    const {firstName,lastName,email,password,confirmPassword,selectedFile}=req.body;
    try {
        const existingUser=await User.findOne({email});
        //console.log(existingUser._id.toString());
        if(existingUser!==null) return res.status(400).json({message:"email already exist"});
        if(password!==confirmPassword) return res.status(400).json({message:"Password doesnt match"});
        const hashedPassword=await bcrypt.hash(password, 12);
        const result= await User.create({name:`${firstName} ${lastName}`,email,password:hashedPassword,selectedFile})
        const token =jwt.sign({email: result.email, id:result._id},'test', { expiresIn: "1h"})
        res.status(200).json({result, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"});
    }
}