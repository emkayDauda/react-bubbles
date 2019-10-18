import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bulma-components";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = ({ history }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialForm = {
    username: '',
    password: ''
  }

  const attemptLogin = (formValues, actions) => {
    axiosWithAuth().post('/login', formValues)
    .then(({ data }) => {
      localStorage.setItem('token', data.payload)
      actions.resetForm();
      history.push('/bubbles')
    })
    .catch(err => alert(err))
  }
  return <Formik
    initialValues = {initialForm}
    onSubmit = {attemptLogin}
    render = {props => <Form>
        <h3>Login</h3>
        <Field name='username' type='text' placeholder='Username' />
        <Field name='password' type='password' placeholder='Password' />
        <Button type='submit' color='info' >Login</Button>
      </Form>
    }
  />;
};

export default Login;
