import { SIGNUP_GET_FAILURE, SIGNUP_GET_REQUEST, SIGNUP_GET_SUCCESS } from "./ActionTypes";

const InitialData = {
    isLoading : false,
    response : '',
    isError : false
}

export default function  SignUpReducer  (state=InitialData,action) {
    const {type,payload} = action;

    switch(type){
        case  SIGNUP_GET_REQUEST : {
            return {
                ...state,
                isLoading : true,
                isError : false
            }
        }

        case SIGNUP_GET_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                response : payload,
                isError : false
            }
        }

        case SIGNUP_GET_FAILURE : {
            return {
                ...state,
                isLoading : false,
                response : '',
                isError : true
            }
        }
        default : 
        return state;
    }
}