import { Redirect } from "react-router-dom";
import React from "react";

export default function withAuthCheck(Component, props) {
    if(localStorage.getItem('token')){
        return <Component {...props} />
    }
    alert('Need to be logged in')
    return <Redirect to = '/'/>
}