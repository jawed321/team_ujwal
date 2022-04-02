import * as api from '../api/index.js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FETCH_ALL,CREATE,DELETE,UPDATE,LIKE, START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_POST, COMMENT, FETCH_MYPOSTS } from '../constants/actionTypes.js';
import { useSelector } from 'react-redux';

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data:{data, currentPage, numberOfPages} } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: {data, currentPage, numberOfPages } });
    dispatch({type:END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};
export const getMyPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data:{data, currentPage, numberOfPages} } = await api.fetchMyPosts(page);
    dispatch({ type: FETCH_MYPOSTS, payload: {data, currentPage, numberOfPages }});
    dispatch({type:END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data});
    dispatch({type:END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost=(value, id)=>async (dispatch)=>{
  try {
    const {data}=await api.comment(value,id);
    dispatch({type:COMMENT, payload: data})
    return data.comments;
  } catch (error) {
    console.log(error);
  }
}
export const deleteCommentPost=(value, id)=>async (dispatch)=>{
  try {
    const {data}=await api.deletecomment(value,id);
    dispatch({type:COMMENT, payload: data})
    return data.comments;
  } catch (error) {
    console.log(error);
  }
}

export const getPostsBySearch=(searchQuery)=> async (dispatch)=>{
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload:  data  });
    dispatch({ type: END_LOADING });
    console.log(data);
  } catch (error) {
    console.log(error)
  }
}

export const createPost =(post,history)=> async (dispatch)=>{
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    console.log(data)
    dispatch({ type: CREATE, payload: data });
    dispatch({type: END_LOADING});
    history.push(`/posts`);
    toast.success('post added successfully', {
      position: 'bottom-center',
      theme:'colored',
      autoClose: 5000,
      draggable: true
  })
  } catch (error) {
    console.log(error.message)
  }
}

export  const updatePost=(id,post)=>async (dispatch)=>{
  try {
    const {data}=await api.updatePost(id,post)
    dispatch({type:UPDATE,payload:data});
    toast.success('post updated successfully',{
      position:'bottom-center',
      theme:'colored',
      autoClose:5000,
      draggable:true
     })
  } catch (error) {
    console.log(error);
    toast.success('oops something went wrong',{
      position:'bottom-center',
      theme:'colored',
      autoClose:5000,
      draggable:true
     })

  }
}

export const deletePost=(id)=>async (dispatch)=>{
  try {
    dispatch({type:START_LOADING})
    await api.deletePost(id);
    dispatch({type:DELETE, payload:id})
    dispatch({type:END_LOADING})
    //console.log('actions working')
    toast.success('post deleted successfully', {
      position: 'bottom-center',
      theme:'colored',
      autoClose: 5000,
      draggable: true
  })
  } catch (error) {
    console.log(error);
    toast.error('oops something went wrong', {
      position: 'bottom-center',
      theme:'colored',
      autoClose: 5000,
      draggable: true
    })
  }
}

export const likePost =(id)=>async (dispatch)=>{
  try {
    const {data}=await api.likePost(id)
    dispatch({type:LIKE,payload:data});
  } catch (error) {
    console.log(error);
  }
}
