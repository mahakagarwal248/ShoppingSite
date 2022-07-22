import * as api from '../api';

export const signup = (userData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signup(userData);
        dispatch({type:'AUTH', data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const login = (loginData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.login(loginData);
        dispatch({type:'AUTH', data})
        navigate('/')
    } catch (error) {
        console.log(error);
        if(error.message === "Request failed with status code 400"){
            window.alert("Invalid Password")
        }else if(error.message === "Request failed with status code 404"){
            window.alert("User doesn't exist")
        }
    }
}