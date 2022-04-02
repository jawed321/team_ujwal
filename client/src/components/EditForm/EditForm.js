import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from '../Auth/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../Auth/Input';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import { updateProfile } from '../../actions/auth';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function EditForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user?.result?.name.split(' ')[0]);
    const initialUserData = {
        firstName: user?.result?.name.split(' ')[0]
        , lastName: user?.result?.name.split(' ')[1],
        email: user?.result?.email, password: '', confirmPassword: '', selectedFile: user?.result?.selectedFile
    }
    const [UserData, setUserData] = useState(initialUserData);
    useEffect(() => {
        onLoading();
    }, [])
    //const [isSignup,setisSignup] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(UserData, history));
        // if(isSignup){
        //     dispatch(signup(UserData,history));
        // }else{
        //     dispatch(signin(UserData,history));
        // }
    }
    const onLoading = () => {
        setUserData(initialUserData);
    }
    const handleChange = (e) => {
        setUserData({ ...UserData, [e.target.name]: e.target.value });
        console.log(UserData)
    }
    return (user===null)?(
        <div>
            {
                toast.error('Signin to view this page', {
                    position: 'bottom-center',
                    theme:'colored',
                    autoClose: 5000,
                    draggable: true
                })
            }
            <Redirect to="/auth" />
        </div>
    ) :(
        <Container componenet="main" max-width='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Edit profile</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Input defaultValue={UserData.firstName} name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input defaultValue={UserData.lastName} name="lastName" label="Last Name" handleChange={handleChange} half />
                        <Input defaultValue={UserData.email} name="email" label="Email Address" handleChange={handleChange} type="email" />
                    </Grid>
                    <FileBase
                        type="image"
                        multiple={false}
                        onDone={({ base64 }) => setUserData({ ...UserData, selectedFile: base64 })}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Save Changes
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default EditForm