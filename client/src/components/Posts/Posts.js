import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { Grid, LinearProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';
const Posts = ({ setCurrentId, num}) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    console.log(posts);
    if (posts.length==0 && !isLoading) return 'No Posts';
    return (num == 0) ? (
        isLoading ? (
            <div>
                <LinearProgress />
            </div>) : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    ) : (
        isLoading ? (
            <div>
                <LinearProgress />
            </div>) : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}
export default Posts
