import React, { useRef } from 'react';
import {TextField,Button,Typography,Paper,Container, Grow, Grid} from '@material-ui/core'
import useStyles from './styles'
import { useState,useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from 'react-redux';
import { createPost,updatePost } from '../../actions/posts';
import { useHistory, useParams } from 'react-router';
const Form1=()=> {
    const {id}=useParams();
    const currentId=id;
    console.log(currentId);
    let post=useSelector((state)=>currentId?state.posts.posts.find((p)=>p._id===currentId):null);
    console.log(currentId);
    const classes=useStyles();
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'));
    const history=useHistory()
    //const editRef=useRef();
    useEffect(() => {
        console.log(post)
        //console.log(editRef)
        if(post) setpostData(post);
        if(post!==null){
            // editRef.current.scrollIntoView({behavior:'smooth'});
        }
    }, [post]);

    const clear=()=>{
        setpostData({title:'',content:'',tags:'',district:'',location:'',selectedFile:''});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
            clear();
            history.goBack();
    }

    const [postData,setpostData]=useState({
        title:'',content:'',tags:'',district:'',location:'',selectedFile:''
    })
    if(!user?.result?.name || post?.creator!==user?.result?._id){
        return(
            <div>
                <p>Sign In to Post</p>
            </div>
        )
    }
    return (
        <div>
            <Grow in>
                <Container maxWidth='xl'>
                    <Grid className={classes.gridContainer} container justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} sm={8} md={4}>
            <Paper  className={classes.paper}>
                <form autoComplete="off" className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                    <Typography variant="h5" fullWidth>{currentId?'Editing Post':'Post Project'}</Typography>
                     <TextField
                     name="title" 
                     variant="outlined" 
                     label="Title" fullWidth value={postData.title} 
                     onChange={(e)=>setpostData({...postData,title:e.target.value})}/>
                     <TextField
                     name="content" 
                     variant="outlined" 
                     label="Content" fullWidth value={postData.content} 
                     onChange={(e)=>setpostData({...postData,content:e.target.value})}/>
                     <TextField
                     name="district" 
                     variant="outlined" 
                     label="district Link" fullWidth value={postData.district} 
                     onChange={(e)=>setpostData({...postData,district:e.target.value})}/>
                     <TextField
                     name="location" 
                     variant="outlined" 
                     label="Hosted Site Link" fullWidth value={postData.location} 
                     onChange={(e)=>setpostData({...postData,location:e.target.value})}/>
                     <TextField
                     name="tags" 
                     variant="outlined" 
                     label="chatroom id" fullWidth value={postData.tags} 
                     onChange={(e)=>setpostData({...postData,tags:e.target.value.split(',')})}/>
                     <div className={classes.fileInput}>
                    <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=>setpostData({...postData, selectedFile:base64})}
                    />
                    </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Post</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Discard</Button>
                
                </form>
            </Paper>
            </Grid>
            </Grid>
            </Container>
            </Grow>
        </div>
    )
}

export default Form1