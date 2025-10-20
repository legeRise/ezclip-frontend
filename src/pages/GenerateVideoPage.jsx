import React, { useState } from 'react'
import TextToVideoForm from '../components/forms/TextToVideoForm'
import TitleToVideoForm from '../components/forms/TitleToVideoForm'
import FormLayout from '../Layouts/FormLayout'
import FloatingFeedback from '../components/FloatingFeedback'

const InfoBanner = () => (
  <div className="max-w-xl mx-auto mb-3 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 shadow-sm text-blue-900 text-xs font-medium flex flex-col gap-1">
    <div>
      ⏳ If your video is taking time, check back after a few minutes by visiting your{' '}
      <a href="/#/my-creations" className="font-semibold underline text-blue-700 hover:text-blue-900">My Creations</a> page.
    </div>
    <div>
      ⚠️ If you see <span className="font-semibold">"Failed to fetch progress"</span>, do the same, check {' '}
      <a href="/#/my-creations" className="font-semibold underline text-blue-700 hover:text-blue-900">My Creations</a> page after a few minutes.    </div>
    <div>
      ❌ The Status shows 
      <span className="px-1 mx-1 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">in progress </span>
       even after 10 or more minutes? It's likely failed — please mention it in your feedback.
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
            <div className="flex justify-center mb-4 gap-2">
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
            </div>
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
