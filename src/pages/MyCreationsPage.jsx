import React from 'react'
import MyCreations from '../components/forms/MyCreations'
import FormLayout from '../Layouts/FormLayout'

const MyCreationsPage = () => {
  const heading = 'My Creations'
  const description = ''
  const form = <MyCreations/>
  return (
    <FormLayout
    heading={heading}
    description={description}
    form={form}
    wide={true}
    />
  )
}

export default MyCreationsPage
