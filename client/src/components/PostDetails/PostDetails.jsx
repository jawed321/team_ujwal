import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider,Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import './post.css';

function PostDetails() {
    const { post, posts, isLoading,currentPage } = useSelector((state) => state.posts);
    const user=JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    console.log(currentPage);
    useEffect(() => {
        dispatch(getPost(id))
    }, [id]);
    if (!post) return null;

  console.log(post);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <Button onClick={()=>history.goBack()}>Back</Button>
            <div className={classes.card}>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
                <div className={classes.section}>
                    <Typography variant="h5" className="ptitle" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Button style={{ marginTop: '10px' }} disabled={!user} color="primary" variant="contained">
                            <a target='_blank' href={`https://sanchar-chat.herokuapp.com/chat.html?username=${user?.result?.name}&room=${post.tags[0]}`}>Join chat</a>
                    </Button>
                    <Typography gutterBottom variant="body1" className="postcn" component="p">{post.content}</Typography>
                    <Typography variant="h6">District : {post.district}</Typography>
                    <Typography variant="h6">Location : {post.location}</Typography>
                    <Typography variant="h6">Posted by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.postedOn).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post}/> 
                    <Divider style={{ margin: '20px 0' }} />
                </div>
            </div> 

        </Paper>
    )
}

export default PostDetails
