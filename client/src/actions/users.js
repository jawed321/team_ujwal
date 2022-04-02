import * as api from '../api/index.js';
import 'react-toastify/dist/ReactToastify.css'
import {FETCH_USER} from '../constants/actionTypes.js';

export const getUserdetail = () => async (dispatch) => {
  try {
    const { data } = await api.getUserdetail();

    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
