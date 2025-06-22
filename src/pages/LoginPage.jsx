import React from 'react'
import LoginForm from '../components/forms/LoginForm'
import FormLayout from '../Layouts/FormLayout';



const LoginPage = ({setIsAuthenticated}) => {
  const heading = 'Welcome Back!';
  const description = 'Sign in to start making videos effortlessly.';
  const form = <LoginForm setIsAuthenticated={setIsAuthenticated} />;
  return (
      <FormLayout
      heading={heading}
      description={description}
      form={form}
      />
  )
}

export default LoginPage
