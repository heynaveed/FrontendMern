import { SIGNUP_GET_FAILURE, SIGNUP_GET_REQUEST, SIGNUP_GET_SUCCESS } from "./ActionTypes"

export const  SignUpRequest = ( ) =>{
    return {
        type : SIGNUP_GET_REQUEST
    }
}

export const  SignUpSuccess = (payload) =>{
    return {
        type : SIGNUP_GET_SUCCESS,
        payload,
    }
}

export const  SignUpFailure = ( ) =>{
    return {
        type : SIGNUP_GET_FAILURE
    }
}