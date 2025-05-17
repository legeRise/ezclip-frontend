import React, { useState } from 'react'
import TextToVideoForm from './forms/TextToVideoForm';
import TitleToVideoForm from './forms/TitleToVideoForm';
import AudioToVideoForm from './forms/AudioToVideoForm';
import LoginForm from './forms/LoginForm';
import SingupForm from './forms/SignupForm';

const HeroSection = (props) => {
  const typeData = {
    'login' : {
      heading: 'Sign in to EzClip',
      description: 'Sign in to your account to start generating videos',
      form: <LoginForm {...props}/>,
    },
    'signup' : {
      'heading': 'Welcome to EzClip',
      'description': 'Join us to start generating videos',
      'form': <SingupForm {...props}/>,
    },
    'text_to_video': {
      heading: 'Turn Your Story into a Video',
      description: 'Paste your story or script below and EzClip will automatically create a narrated video for you',
      form: <TextToVideoForm />,
    },
    'title_to_video': {
      heading: 'Turn Your Title into a Video',
      description: 'Paste your title below and EzClip will automatically create a video for you',
      form: <TitleToVideoForm />,
    },
    'audio_to_video': {
      heading: 'Turn Your Audio into a Video',
      description: 'Upload your audio file below and EzClip will automatically create a video for you',
      form: <AudioToVideoForm />,
    },
  };
  const { heading, description, form } = typeData[props.selectedType];


  return (
    <section className="bg-green-200 min-h-screen flex flex-col items-center justify-start gap-6 pt-16 px-4">
    <h1 className="text-3xl md:text-5xl text-center">{heading}</h1>
    <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-lg text-center">
            {description}
        </p>
        <div className="w-full max-w-3xl bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border border-gray-200">
          {form}
        </div>
    </div>
</section>
  )
}

export default HeroSection