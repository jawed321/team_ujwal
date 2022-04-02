import mongoose from "mongoose";
import express from "express";
import postContent from "../models/postContent.js";
export const getPosts = async (req, res) => {
    const {page}=req.query
    try {
        const LIMIT=9;
        const startIndex=(Number(page)-1)*LIMIT;
        
        const total=await postContent.countDocuments({});
        const postContents = await postContent.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        // if(page>Math.ceil(total/LIMIT)){
        //     page=Math.ceil(total/LIMIT);
        // }
        // console.log(page);
        res.status(200).json({data:postContents, currentPage:Number(page), numberOfPages : Math.ceil(total/LIMIT)});
        //console.log(Math.ceil(total/LIMIT));
    } catch (error) {
        res.send(404).json({ message: error.message });
    }
}
export const getPost = async (req, res) => {
    const {id}=req.params
    try {
        const post= await postContent.findById(id);
        //console.log(post);
        res.status(200).json(post);
    } catch (error) {
        res.sendStatus(404).json({ message: error.message });
    }
}
export const getPostsBySearch = async (req, res) => {
    console.log('hello2');
    const {searchQuery,tags}=req.query;
    try {
        const district=new RegExp(searchQuery,'i');
        const posts=await postContent.find({ $or: [ { district }, { tags: { $in: tags.split(',') } } ]});
        //console.log(posts.tags[0]);
        //console.log(posts);
        res.json({data:posts})
    } catch (error) {
        console.log("lol")
        res.send(404).json({ message: error.message });
    }
}
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postContent({...post,creator:req.userId,postedOn: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.send(409).json({ message: error.message })
    }
}
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, creator, selectedFile,github,website, tags, likes,name} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { title, content, creator, selectedFile, github ,website, tags, likes, _id: id,name};

    await postContent.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    console.log('deleted')
    await postContent.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
}
export const likePost = async (req, res) => {
    const { id } = req.params;
    if(!req.userId) return res.json({message:'Unauthenticated'});
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');
    const post = await postContent.findById(id);
    post.likes.push(req.userId);
    const updatedPost = await postContent.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
}

