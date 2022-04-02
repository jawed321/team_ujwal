import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from '../Auth/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../Auth/Input';
//import { GoogleLogin } from 'react-google-login';
//import Icon from '../Auth/Icon';
import { useDispatch } from 'react-redux'
//import { AUTH } from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';
import { changePassword} from '../../actions/auth';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function EditPassword() {
    const user=JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const initialUserData = { password: '', confirmPassword: ''}
    const [UserData, setUserData] = useState(initialUserData);
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword(UserData,history));
    }
    const handleChange = (e) => {
        setUserData({ ...UserData, [e.target.name]: e.target.value });
        console.log(UserData);
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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
    ) : (
        <Container componenet="main" max-width='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Change Password</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Change Password
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default EditPassword