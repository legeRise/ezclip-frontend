import React, { useState } from 'react'
import TextToVideoForm from '../components/forms/TextToVideoForm'
import FormLayout from '../Layouts/FormLayout'
import FloatingFeedback from '../components/FloatingFeedback'
import { Alert, AlertDescription } from '@/components/shadcn/alert'
import { AlertTriangle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const InfoBanner = () => (
  <Alert className="mb-4 border-yellow-500/50 bg-yellow-500/10">
    <AlertTriangle className="h-4 w-4 text-yellow-600" />
    <AlertDescription className="text-yellow-700">
      If you see any error while generating, please be patient and check{' '}
      <Link to="/my-creations" className="font-semibold underline hover:text-yellow-900">
        My Creations
      </Link>{' '}
      after a few minutes.
    </AlertDescription>
  </Alert>
);

const GenerateVideoPage = () => {
  const [selectedForm, setSelectedForm] = useState('text2video');

  const heading = (
    <span className="flex items-center justify-center gap-2">
      <Sparkles className="h-6 w-6 text-primary" />
      Turn Your Story into a Video
    </span>
  );
  const description = 'Paste your script or story below and let AI create a stunning video for you';

  return (
    <>
      <FormLayout
        heading={heading}
        description={description}
        form={
          <>
            <InfoBanner />
            <TextToVideoForm />
          </>
        }
        wide={true}
      />
      <FloatingFeedback />
    </>
  )
}

export default GenerateVideoPage
