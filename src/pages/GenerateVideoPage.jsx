import React, { useState } from 'react'
import TextToVideoForm from '../components/forms/TextToVideoForm'
import FormLayout from '../Layouts/FormLayout'
import FloatingFeedback from '../components/FloatingFeedback'

const InfoBanner = () => (
  <div className="max-w-xl mx-auto mb-3 px-3 py-2 rounded-lg bg-yellow-50 border border-yellow-200 shadow-sm text-yellow-900 text-xs font-medium flex flex-col gap-1">
    <div>
      ⚠️ If you see any <span className="text-red-700 font-bold">Error</span> while the video is generating, please be patient and check{' '}
      <a href="/#/my-creations" className="font-semibold underline text-green-700 hover:text-blue-900">My Creations</a>{' '}
      after a few minutes.
    </div>

  </div>
);

const GenerateVideoPage = () => {
  const [selectedForm, setSelectedForm] = useState('text2video');

  const heading = 'Turn Your Story into a Video';
  const description = '';

  return (
    <>
      <FormLayout
        heading={heading}
        description={description}
        form={
          <>
            <InfoBanner />
            {/* <div className="flex justify-center mb-4 gap-2">
              <button
                className={`px-4 py-2 rounded ${selectedForm === 'text2video' ? 'bg-yellow-200 font-bold' : 'bg-gray-100'}`}
                onClick={() => setSelectedForm('text2video')}
              >
                Text to Video
              </button>
              <button
                className={`px-4 py-2 rounded ${selectedForm === 'top5video' ? 'bg-yellow-200 font-bold' : 'bg-gray-100'}`}
                onClick={() => setSelectedForm('top5video')}
              >
                Title to Video
              </button>
            </div> */}
            {selectedForm === 'text2video' ? (
              <TextToVideoForm />
            ) : (
              <div className="text-center my-8">
                <div className="inline-block px-4 py-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-base font-medium shadow-sm">
                  <span className="mr-2">ℹ️</span>
                  <span>
                    <strong>Note:</strong> Title to Video generation is temporarily unavailable.<br />
                    Please use the <span className="font-semibold text-green-700 cursor-pointer" onClick={() => setSelectedForm('text2video')}>Text to Video</span> option above. Thank you for your patience!
                  </span>
                </div>
              </div>
            )}
          </>
        }
        wide={true}
      />
      <FloatingFeedback />
    </>
  )
}

export default GenerateVideoPage
