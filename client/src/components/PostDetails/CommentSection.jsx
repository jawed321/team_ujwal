import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import { commentPost, deleteCommentPost } from '../../actions/posts';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CommentSection({ post }) {
    const [open1, setOpen1] = useState(false);
    const [target,setTaget]=useState('');
    const handleClose = () => {
        setOpen1(false);
        setTaget('');
    };
    const d = new Date();
    const date = `${d.getTime()}`;
    const commentsRef = useRef();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleComment = async () => {
        const finalComment = `${user?.result?._id}: ${date}: ${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        toast.info('Comment added', {
            theme:'colored',
            position: 'bottom-center',
            autoClose: 5000,
            draggable: true
        })
    }
    // console.log(post)
    return (
        <div style={{ width: '100%' }}>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {/* {console.log(c)} */}
                            <strong>{c.split(': ')[2]}</strong>
                            {c.split(':')[3]}
                            {(user?.result?._id === `${c.split(': ')[0]}`) && (
                                <>
                                    <Button size="small" color="secondary" onClick={()=>{
                                        setOpen1(true);
                                        setTaget(c);
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
                                                This comment will be deleted!
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>No</Button>
                                            <Button onClick={
                                                async () => {
                                                    setOpen1(false);
                                                    const newComments = await dispatch(deleteCommentPost(target, post._id));
                                                    console.log(target);
                                                    setComments(newComments);
                                                    toast.info('Comment deleted', {
                                                        theme:'colored',
                                                        position: 'bottom-center',
                                                        autoClose: 5000,
                                                        draggable: true
                                                    })
                                                    setTaget('');
                                                }
                                            } autoFocus>
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </>
                            )}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div className={classes.commentbox}>
                        <Typography gutterBottom variant="h6">Suggestions if Any</Typography>
                        <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                        <br />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection
