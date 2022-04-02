import * as api from '../api/index.js';
import { AUTH, END_LOADING, START_LOADING } from '../constants/actionTypes.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const signin = (UserData, history) => async (dispatch) => {
    dispatch({type:START_LOADING})
    try {
        const { data } = await api.signIn(UserData);
        dispatch({ type: AUTH, data })
        history.push('/');
        dispatch({type:END_LOADING})
        toast.success('logged in successfully', {
            position: 'bottom-center',
            theme: 'colored',
            autoClose: 5000,
            draggable: true
        })
        //data.json().then((data) => {console.log(data.message)});
    } catch (error) {
        dispatch({type:END_LOADING})
        toast.error(error.response.data.message, {
            position: "bottom-center",
            autoClose: 5000,
            theme: 'colored',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        console.log(error.response.data);
    }
}
export const signup = (UserData, history) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const { data } = await api.signUp(UserData);
        //console.log(data);
        dispatch({ type: AUTH, data })
        history.push('/')
        dispatch({type:END_LOADING})
        toast.success('logged in successfully', {
            position: 'bottom-center',
            theme: 'colored',
            autoClose: 5000,
            draggable: true
        })
    } catch (error) {
        dispatch({type:END_LOADING})
        toast.error(error.response.data.message, {
            position: "bottom-center",
            autoClose: 5000,
            theme: 'colored',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        console.log(error);
    }
}
export const updateProfile = (UserData, history) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(UserData);
        console.log(data);
        dispatch({ type: AUTH, data })
        history.push('/')
        toast.success('profile updated successfully', {
            position: 'bottom-center',
            theme: 'colored',
            autoClose: 5000,
            draggable: true
        })
    } catch (error) {
        console.log(error.response)
        toast.error(error.response.data.message, {
            position: 'bottom-center',
            autoClose: 5000,
            draggable: true
        })
        console.log(error);
    }
}
export const changePassword = (UserData,history) => async (dispatch) => {
    try {
        const { data } = await api.changePassword(UserData);
        console.log(data);
        dispatch({ type: AUTH, data })
        history.goBack();
        toast.success('Password Changed successfully', {
            position: 'bottom-center',
            theme: 'colored',
            autoClose: 5000,
            draggable: true
        })
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: 'bottom-center',
            autoClose: 5000,
            draggable: true
        })
        console.log(error);
    }
}
