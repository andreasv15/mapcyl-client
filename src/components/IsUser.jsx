import React, { useContext } from 'react'
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"
//! Navigate (que no useNavigate), es un COMPONENTE que funciona similar a useNavigate
// hemos comprobado que con useNavigate no deja redirigir

//? un HOC => Higher Order Component
function IsUser(props) {
 
    const { isLoggedIn, user} = useContext(AuthContext);

    if (isLoggedIn === true) {
        //console.log(props.children)
        return props.children;
    } else {
        //console.log("no: ", props.children)

        return <Navigate to="/login" />
    }


}

export default IsUser