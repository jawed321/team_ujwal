import React, { useState, useEffect, useRef } from 'react'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination';
import useStyles from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const user=JSON.parse(localStorage.getItem('profile'));
    // const pageRef = useRef();
    // const postRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const searched = useLocation().search;
    const searchQ = new URLSearchParams(searched).get('searchQuery');
    const tags1 = new URLSearchParams(searched).get('tags');
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //search post
        }
    }
    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))
    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
            console.log(tags);
        } else {
            history.push('/');
        }
    }
    const postreffunc=()=>{
        history.push('/posts/newpost')
    }
    useEffect(() => {
        if (searchQ !== null || tags1) {
            console.log(searchQ)
            console.log(tags1);
            //history.push('/posts')
            // setSearch(searchQ);
            // setTags(tags1.split(','));
            dispatch(getPostsBySearch({search:searchQ, tags: tags1}));
            setSearch('');
            setTags([]);
            //history.push(`/posts/search?searchQuery=${searchQ || 'none'}&tags=${tags1}`)
        }
    }, [dispatch])

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        {(searchQuery || tags.length) ? (
                            <Typography>Search Results</Typography>
                        ) : (
                        <div className={classes.prepost}>
                        <Typography variant="h5" style={{margin:'10px 0 10px 0'}}>Issues</Typography>
                        {user?.result?.name ?(<Button onClick={postreffunc} variant="contained" color="primary">Raise A Issue?</Button>):
                        (<Button variant="contained" disabled>Signin to post</Button>)}
                        </div>
                        )}
                        {/* <AppBar className={classes.appBarSearch1} position="static" color="inherit">
                            <TextField onKeyPress={handleKeyPress} name="search" variant="outlined" label="Search Projects" fullWidth value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAdd(chip)}
                                onDelete={(chip) => handleDelete(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar> */}
                        <Posts num={0} setCurrentId={currentId} />
                        
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.paginatebar} elevation={6}  style={{ margin: '20px 0' }}>
                                <Pagination page={page} num={0}/>
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField onKeyPress={handleKeyPress} name="search" variant="standard" label="Search Projects" fullWidth value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAdd(chip)}
                                onDelete={(chip) => handleDelete(chip)}
                                label="Search by Tags"
                                variant="standard"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        {/* <Form  currentId={currentId} setCurrentId={setCurrentId} /> */}
                        <div/>
                        {/* {(searchQuery && tags.length) && (
                            <Button component={Link} to='/posts' >Back to feed</Button>
                        )} */}

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
