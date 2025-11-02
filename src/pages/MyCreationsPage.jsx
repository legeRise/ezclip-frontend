import MyCreations from '../components/forms/MyCreations'
import FormLayout from '../Layouts/FormLayout'

const MyCreationsPage = () => {
  const heading = 'My Creations';
  const description = '';
  return (
    <FormLayout
      heading={heading}
      description={description}
      form={<MyCreations />}
      wide={true}
    />
  )
}

export default MyCreationsPage
