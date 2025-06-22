import React from 'react'
import TextToVideoForm from '../components/forms/TextToVideoForm'
import FormLayout from '../Layouts/FormLayout'
import { Form } from 'react-router-dom'

const GenerateVideoPage = () => {
   const heading = 'Turn Your Story into a Video';
   const description = '';
   const form = <TextToVideoForm />;
  return (
    <FormLayout
      heading={heading}
      description={description}
      form={form}
      wide={true}
    />
  )
}

export default GenerateVideoPage
