import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from './styles'
import { getPosts,getMyPosts } from '../actions/posts';
import { Redirect} from 'react-router';

const Paginate=({page,num,pageRef})=>{
    console.log(num);
    const dispatch=useDispatch();
    const classes=useStyles();
    const {numberOfPages}=useSelector((state)=>state.posts);
    if(page>numberOfPages){
        // return(
        // <Redirect to={`/posts/myposts?page=${numberOfPages}`}/>
        // )
    }
    console.log("pages")
    console.log(useSelector((state)=>state.posts))
    useEffect(() => {
        if(num===0){
            if(page) dispatch(getPosts(page))
        }else{
            if(page) dispatch(getMyPosts(page))
        }
    }, [dispatch,page])
    return(page>numberOfPages)?(num===0?<Redirect to={`/posts?page=${numberOfPages}`}/>:
    <Redirect to={`/posts/myposts?page=${numberOfPages}`}/>):(
        <Pagination
        classes={{ul:classes.ul}}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            num===0?<PaginationItem {...item}  component={Link} to={`/posts?page=${item.page}`}/>:
            <PaginationItem {...item}  component={Link} to={`/posts/myposts?page=${item.page}`}/>
        )
    }
        />
    )
}
export default Paginate;