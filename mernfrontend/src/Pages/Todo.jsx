import axios from "axios";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import {DeleteTodoFailure, DeleteTodoRequest, DeleteTodoSuccess, GetDataAction , 
    GetDataFailureAction, GetDataRequestAction, PostTodoFailure, PostTodoReQuest, 
    PostTodoSuccess, ToggleTodoFailure, ToggleTodoRequest, ToggleTodoSuccess } from "../Redux/TodoReducer/Action";
import AddTodo from "../Pages/AddToDo";
import {AiFillCloseCircle,AiFillCheckCircle,AiFillDelete} from 'react-icons/ai'
import {BsToggleOff,BsToggleOn} from 'react-icons/bs'
import { Link } from "react-router-dom";
import { Flex, Text, Tooltip } from "@chakra-ui/react";

export default function Todo ( ){
    const {todo,isLoading,isError} = useSelector((state)=> {
        return {
            todo : state.ReducerFunction.todo,
            isLoading : state.ReducerFunction.isLoading,
            isError : state.ReducerFunction.isError,
            isAuth : state.Reducer.isAuth
        };
    },shallowEqual);
    const Dispatch = useDispatch( );

    const Head = JSON.parse(localStorage.getItem('LOGIN_TOKEN'));

    //  <-------Get function -------->
    const handleGetData = ( ) =>{
        Dispatch(GetDataRequestAction ( ))
        axios.get(`https://mybackend1-api.onrender.com/todo`, {'headers' : { 'authorization' : 'Bearer'+' '+Head.token}})
        .then((res)=>{
            console.log(res.data)
            Dispatch(GetDataAction(res.data));
        }).catch((err)=>{
            Dispatch(GetDataFailureAction(err))
        })
    };

    useEffect(( )=>{
        handleGetData( );
    },[ ]);
//  <------- Get function -------->

//  <-------Post function -------->
const AddToPost = (title) =>{
    if(title){
        const payload = {
            title,
            status : false
        };
        Dispatch(PostTodoReQuest( ));
        return axios.post(`https://mybackend1-api.onrender.com/todo`, payload, {'headers' : { 'authorization' : 'Bearer'+' '+ Head.token}})
        .then((res)=>{
            Dispatch(PostTodoSuccess(res.data));
        })
        .catch((err)=>{
            Dispatch(PostTodoFailure( ));
        })
    }
}
const handleAdd = (text) =>{
    AddToPost(text).then(( )=> handleGetData( ))
};
//  <-------Post function -------->

//  <-------Toggle function -------->

const ToggleTodo = (_id,updatedStatus) =>{
    console.log(updatedStatus)
    const payload  = {
        _id,
        status : updatedStatus
    }
    Dispatch(ToggleTodoRequest( ));
    return axios.patch(`https://mybackend1-api.onrender.com/todo/${_id}`, payload, {'headers' : { 'authorization' : 'Bearer'+' '+ Head.token}})
    .then((res)=>{
        Dispatch(ToggleTodoSuccess(res.data))
    })
    .catch((err)=>{
        Dispatch(ToggleTodoFailure(err));
    })
}
const handleToggle = (_id,status) =>{
    ToggleTodo(_id,status).then(( )=> handleGetData( ));
}
//  <-------Toggle function -------->

//  <-------Delete function -------->

const DeleteTodo = (id) =>{
    Dispatch(DeleteTodoRequest( ));
   return  axios.delete(`https://mybackend1-api.onrender.com/todo/${id}`,{'headers' : { 'authorization' : 'Bearer'+' '+ Head.token}})
    .then((res)=>{
       Dispatch(DeleteTodoSuccess(res.data))
    })
    .catch((err)=>{
        Dispatch(DeleteTodoFailure(err));
    })
}
const handleDelete = (id) =>{
   DeleteTodo(id).then(( )=> handleGetData( ));
}

//  <-------Delete function -------->

return (
    <>
        <div className='AddTodoCompo'><AddTodo handleAdd={handleAdd}/></div>
        <h1 style={{textAlign :'center'}}>{isLoading && 'LOADING'}</h1>
        <h1>{isError && 'Something Went Wrong'}</h1>
        {todo.length > 0 && todo.map((elem)=>{
            return (
            <Flex key={elem._id} border='1px solid black' justifyContent='space-between' w='40%' m='auto' mt='20px' p='15px' borderRadius='10px'>
                   <Text  w='350px'>{elem.title} </Text>
                    <Text style={elem.status==='true'?{color : 'green'}: {color :'red'}} className='Status'>{elem.status === 'true' ? <AiFillCheckCircle/> : <AiFillCloseCircle/>} </Text>
                    <Tooltip label={elem.status === 'true' ? 'Mark As InComplete' : 'Mark As Complete'}>
                    <Text className="ToggleButton" onClick={( )=> handleToggle(elem._id,elem.status==='false')}>{elem.status ==='true' ? <BsToggleOn/> : <BsToggleOff/>}</Text>
                    </Tooltip>
                    <Tooltip label='Delete Task'>
                    <Text  className='DeleteButton' onClick={( ) => handleDelete(elem._id)}><AiFillDelete/></Text>
                    </Tooltip>
            </Flex>)
        })}
    </>
)
}