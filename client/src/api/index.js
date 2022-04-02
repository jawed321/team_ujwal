import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' }); //https://mostore.herokuapp.com/

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts=(page)=>API.get(`/posts?page=${page}`);
export const fetchMyPosts=(page)=>API.get(`/posts/myposts?page=${page}`);
export const fetchPost=(id)=>API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost=(newPost)=>API.post('/posts',newPost)
export const updatePost=(id,updatedPost)=>API.patch(`/posts/${id}`,updatedPost);
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);
export const comment=(value,id)=>API.post(`/posts/${id}/commentPost`,{value});
export const deletecomment=(value,id)=>API.patch(`/posts/${id}/deleteCommentPost`,{value});

export const signIn = (UserData) => API.post('/user/signin',UserData);
export const updateProfile = (UserData) => API.patch('/user/editprofile',UserData)
export const changePassword = (UserData) => API.patch('/user/changepassword',UserData)
export const signUp = (UserData) => API.post('/user/signup',UserData);
export const getUserdetail=()=>API.get(`/user`);