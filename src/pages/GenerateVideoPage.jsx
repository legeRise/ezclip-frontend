import React from 'react'
import TextToVideoForm from '../components/forms/TextToVideoForm'
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
      <a href="/#/my-creations" className="font-semibold underline text-blue-700 hover:text-blue-900">My Creations</a> page after a few minutes. If it still hasn't generated, please mention it in feedback.
    </div>
  </div>
);

const GenerateVideoPage = () => {
  const heading = 'Turn Your Story into a Video';
  const description = '';
  const form = <TextToVideoForm />;
  return (
    <>
      <FormLayout
        heading={heading}
        description={description}
        form={
          <>
            <InfoBanner />
            {form}
          </>
        }
        wide={true}
      />
      <FloatingFeedback />
    </>
  )
}

export default GenerateVideoPage
