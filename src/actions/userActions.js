import axios from "axios"
import { NOTE_LIST_RESET } from "../constants/noteConstants"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const res = await axios.post('https://2et8t5vm3a.execute-api.ap-south-1.amazonaws.com/dev/api/users/login', { email, password }, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        })
        localStorage.setItem('userInfo', JSON.stringify(res.data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('https://2et8t5vm3a.execute-api.ap-south-1.amazonaws.com/dev/api/users', {name, email, password}, config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        })
        localStorage.setItem('userInfo', JSON.stringify(res.data) )
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message 
        })
    }
} 

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: NOTE_LIST_RESET
    })
}
