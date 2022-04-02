import { ADDTOF,FETCH_USER } from '../constants/actionTypes';
const users= (users=[],action) => {
    switch (action.type) {
        case FETCH_USER: 
        console.log(action.payload)
            return action.payload;
        case ADDTOF:
            console.log(action.payload)
            return action.payload;
        default:
            return users;
    }
}
export default users;