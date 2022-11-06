import { Button, Container, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { SignUpFailure, SignUpRequest, SignUpSuccess } from "../Redux/SignUpReducer/Action";

export default function SignUp (  ) {
    const [Email,SetEmail] = useState('');
    const [Password,SetPassword] = useState('');
    const {isLoading,response,isError} = useSelector((store)=>{
        return {
            isLoading : store.SignUpReducer.isLoading,
            response : store.SignUpReducer.response,
            isError : store.SignUpReducer.isError
        }
    })

    const DisPatch = useDispatch( );

    const handleSignUpData = (e,p)=> {
        const payload = {
            email : e,
            password : p,
        }
        DisPatch(SignUpRequest( ));
        return axios.post(`https://mybackend1-api.onrender.com/signup`, payload)
        .then((res)=>{
            console.log(res.data)
            DisPatch(SignUpSuccess(res.data));
        })
        .catch((e)=> DisPatch(SignUpFailure(e)));
    }

    const handleSignUp = ( e,p) =>{
        handleSignUpData (e,p);
    }

    return (
        <>
        <Container>
            <h1>{isLoading && 'Loading'}</h1>
            <h1>{isError && 'Something really went Wrong'}</h1>
            <h1>{response}</h1>
            <Input placeholder="Email" value={Email} onChange={(e)=>SetEmail(e.target.value)}/> 
            <Input placeholder="Password" value={Password} onChange={(e)=>SetPassword(e.target.value)} />
            <Button onClick={( )=> handleSignUp(Email,Password)}>Sign Up</Button>
        </Container>
        </>
    )
}