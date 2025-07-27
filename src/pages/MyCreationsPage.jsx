import React, { useState } from 'react'
import MyCreations from '../components/forms/MyCreations'
import FormLayout from '../Layouts/FormLayout'

const MyCreationsPage = () => {
  const [selectedType, setSelectedType] = useState('text2video');
  const heading = 'My Creations';
  const description = '';
  return (
    <FormLayout
      heading={heading}
      description={description}
      form={
        <>
          <div className="flex justify-center mb-4 gap-2">
            <button
              className={`px-4 py-2 rounded ${selectedType === 'text2video' ? 'bg-yellow-200 font-bold' : 'bg-gray-100'}`}
              onClick={() => setSelectedType('text2video')}
            >
              Text to Video
            </button>
            <button
              className={`px-4 py-2 rounded ${selectedType === 'top5video' ? 'bg-yellow-200 font-bold' : 'bg-gray-100'}`}
              onClick={() => setSelectedType('top5video')}
            >
              Title to Video
            </button>
          </div>
          <MyCreations selectedType={selectedType} />
        </>
      }
      wide={true}
    />
  )
}

export default MyCreationsPage
