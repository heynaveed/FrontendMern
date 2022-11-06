import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export default function PrivateRoutes ({children}) {

    const {token} = useSelector((state)=> {
        return {
            token : state.Reducer.token
        }
    })
//     const LSTOKEN = localStorage.getItem('LOGIN_TOKEN')
// console.log(LSTOKEN)
    if(!token){
        return <Navigate to='/login'/>
    }
    return children
}