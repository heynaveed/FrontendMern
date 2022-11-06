import { Route, Routes } from "react-router-dom";
import LogIn from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";
import Todo from "../Pages/Todo";
import PrivateRoutes from "./PrivateRoute";

export default function AllRoutes ( ){
    return (
        <>
        <Routes>
            <Route path="/" element={ <PrivateRoutes><Todo/></PrivateRoutes>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
        </>
    )
}