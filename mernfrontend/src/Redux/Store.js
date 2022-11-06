import { applyMiddleware, legacy_createStore } from "redux";
import ReducerFunction from "./TodoReducer/Reducer";
import { combineReducers } from "redux";
import Reducer from "./LoginReducer/Reducer";
import SignUpReducer from "./SignUpReducer/Reducer";
import thunk from "redux-thunk";


const MainReducer = combineReducers({ReducerFunction,Reducer,SignUpReducer})

export const ReduxStore = legacy_createStore(MainReducer,applyMiddleware(thunk))