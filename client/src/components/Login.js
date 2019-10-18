import React from "react";
import { Formik, Form, Field } from "formik";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialForm = {
    username: '',
    password: ''
  }
  return <Formik
    initialValues = {initialForm}
    onSubmit = {() => {}}
    render = {props => <Form>
        <h3>Login</h3>
        <Field name='username' type='text' placeholder='Username' />
        <Field name='password' type='password' placeholder='Password' />
      </Form>
    }
  />;
};

export default Login;
