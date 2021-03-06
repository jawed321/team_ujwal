import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { useDispatch } from 'react-redux'
import { AUTH } from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth'
import FileBase from 'react-file-base64';
import Rocket from '../assets/rocket.png';
import Login from '../assets/login.png';
import './auth2.css';

function Auth() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const state = null;
    const initialUserData = { firstName: '', lastName: '',aadhar:'',email: '', password: '', confirmPassword: '',selectedFile:'' }
    const [UserData, setUserData] = useState(initialUserData);
    const [isSignup, setisSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: AUTH, data: { result, token } })
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleError = () => {
        console.log("google sign in unsuccessful")
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(UserData, history));
        } else {
            dispatch(signin(UserData, history));
        }
    }
    const handleChange = (e) => {
        setUserData({ ...UserData, [e.target.name]: e.target.value });
        console.log(UserData);
    }
    const switchMode = () => {
        setisSignup((previsSignup) => !previsSignup);
        setShowPassword(false);
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
    <div className="login">

    

        <Container className="login lg" componenet="main" max-width='xs'>
            
            {/* <Paper className={classes.paper} elevation={3}> */}
            {/* <div className="lgin-content"> */}
            <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography className="sign" variant="h4">{isSignup ? 'Create Your Account !!!' : 'Sign In to Account !!!'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                <Input name="aadhar" label="Aadhar Card No." handleChange={handleChange} />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    {isSignup && 
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => setUserData({ ...UserData, selectedFile: base64 })}
                    />}
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            {/* </div> */}
            
               
                
               
                
            {/* </Paper> */}
        </Container>
        <div className="lgin-pic">
                <img className="jj" src={Login} alt=""/>
                </div>
        </div>
    )
}
export default Auth
