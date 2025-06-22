import React from 'react'
SignupForm
import FormLayout from '../Layouts/FormLayout'
import SignupForm from '../components/forms/SignupForm';

const SignupPage = () => {
  const heading = 'Join Ezclip';
  const description = 'Create an account to start making videos effortlessly.';
  const form = <SignupForm/>;
  return (
    <FormLayout
      heading={heading}
      description={description}
      form={form}
    />
  )
}

export default SignupPage
