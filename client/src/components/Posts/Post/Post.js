import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import './kk.css'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts'
import { addFav, getUserdetail } from '../../../actions/users'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation} from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Post({ post}) {
    const [open1, setOpen1] = useState(false);
    const [target,setTaget]=useState('');
    const handleClose = () => {
        setOpen1(false);
        setTaget('');
    };
    const {currentPage}=useSelector((state)=>state.posts);
    const [likes,setLikes]=useState(post?.likes)
    const classes = useStyles();
    const dispatch = useDispatch();
    const location=useLocation();
    let user = JSON.parse(localStorage.getItem('profile'))
    useEffect(() => {
        if(user?.result?.googleId || user?.result?._id){
            dispatch(getUserdetail());
        }
    }, [dispatch,location]);

    const users=useSelector((state)=>state.users)
    // console.log(user?.result?.favourites)
    // const usersfind=users.find((user1)=>user1._id === (user?.result?.googleId || user?.result?._id))
    // console.log(usersfind);
    const userId=user?.result?.googleId || user?.result?._id;
    const hasLiked=post?.likes?.find((like) => like === userId)
    const handleLike=async ()=>{
        dispatch(likePost(post._id))
        if(hasLiked){
            setLikes(post?.likes.filter((id)=>id!==userId));
        }else{
            setLikes([...post?.likes,userId]);
        }
    }
    const Likes = () => {
        //console.log(likes)
        if (likes.length > 0) {
            return likes?.find(like => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />UnSupport</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />Support</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Support</>;
    };
    const history = useHistory();
    const openPost = (e) => {
        history.push(`/posts/${post._id}`)
        console.log("heyy")
    }

    return (
        
        <Card className={classes.card} raised elevation={4}>

            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.postedOn).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={() => history.push(`/posts/editpost/${post._id}`)}><EditIcon fontSize="small" /></Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => (`#${tag}`))}</Typography>
                </div>
                <Typography className={classes.title} variant="h6" gutterBottom>{post.title}</Typography>
                <CardContent>
                <Typography gutterBottom variant="body1" component="p">{post.content.length>100?(`${post.content.substring(0,95)}...`):(post.content)}</Typography>
                    {/* <Typography variant="h6" gutterBottom>{post.content.length>40?(`${post.content.substring(0,37)}...`):(post.content)}</Typography> */}
                    
                    <div><i class="fa-solid fa-location-dot"></i>&nbsp; Location</div>
                    <Typography gutterBottom variant="body1" component="p">Supported By : <a target="_blank" href={post?.github}><GitHubIcon/></a>&nbsp;
                    <a target="_blank" href={post?.website}><LanguageIcon/></a>
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                <Button className={classes.viewbutton} size="small" variant="contained" onClick={openPost}>
                    view Issues
                </Button>
                </CardActions>
            <CardActions className={classes.cardActions}>
                <Button size="small" disabled={!user?.result} color="primary" onClick={handleLike}>
                <Likes />
                </Button>
                <Button size="small" onClick={openPost} color="primary">
                        <CommentOutlinedIcon/>
                        &nbsp;{post?.comments?.length}
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <>
                    <Button size="small" color="secondary" onClick={() => {
                        setOpen1(true);
                        setTaget(post._id);
                    }}>
                        <DeleteIcon fontSize="small" />
                    </Button>
                    <Dialog
                                        open={open1}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Are you Sure?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                This Post will be deleted!
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>No</Button>
                                            <Button onClick={
                                            () => {
                                                    setOpen1(false);
                                                    dispatch(deletePost(target));
                                                    setTaget('');
                                                }
                                            } autoFocus>
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                    </>
                    
                )}
            </CardActions>
        </Card>
    )
}

export default Post
