import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider,Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

function PostDetails() {
    const { post, posts, isLoading,currentPage } = useSelector((state) => state.posts);
    console.log(currentPage);
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
                    <Typography variant="h5" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.content}</Typography>
                    <Typography variant="h6">View Project on <a target="_blank" href={post.github}>Github</a></Typography>
                    <Typography variant="h6">View on <a target="_blank" href={post.website}>Website</a></Typography>
                    <Typography variant="h6">Posted by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.postedOn).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post}/> 
                    <Divider style={{ margin: '20px 0' }} />
                </div>
            </div>
            {/* {!!recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
        </Paper>
    )
}

export default PostDetails
