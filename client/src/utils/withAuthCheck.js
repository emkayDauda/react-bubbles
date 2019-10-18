import { Redirect } from "react-router-dom";
import React from "react";

export default function withAuthCheck(Component, props) {
    if(localStorage.getItem('token')){
        return <Component {...props} />
    }
    return <Redirect to = '/'/>
}