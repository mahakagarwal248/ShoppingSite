import * as api from '../api';

export const signup = (userData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signup(userData);
        dispatch({type:'AUTH', data});
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
        console.log(error)
    }
}