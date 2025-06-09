import React, { useState } from 'react'
import TextToVideoForm from './forms/TextToVideoForm';
import TitleToVideoForm from './forms/TitleToVideoForm';
import AudioToVideoForm from './forms/AudioToVideoForm';
import MyCreations from './forms/MyCreations'
import LoginForm from './forms/LoginForm';
import SingupForm from './forms/SignupForm';

const HeroSection = (props) => {
  const typeData = {
    'login' : {
      heading: 'Welcome Back!',
      description: 'Sign in to start making videos effortlessly.',
      form: <LoginForm {...props}/>,
    },
    'signup' : {
      'heading': 'Join Ezclip',
      'description': 'Create an account to start making videos effortlessly.',
      'form': <SingupForm {...props}/>,
    },
    'text_to_video': {
      heading: 'Turn Your Story into a Video',
      description: '',
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
    'my_creations' : {
      heading: 'My Creations',
      description: '',
      form: <MyCreations/>
    }
  };
  const { heading, description, form } = typeData[props.selectedType];
  const wideTypes = ['text_to_video', 'title_to_video', 'audio_to_video','my_creations'];
  const widthClass = wideTypes.includes(props.selectedType) ? 'max-w-3xl' : 'max-w-md';


  return (
    <section className="bg-green-200 min-h-screen flex justify-center items-center px-4">
        <div className={`bg-white shadow-lg p-8 rounded-xl w-full ${widthClass}`}>
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-600">{heading}</h1>
        <p className="text-gray-600 mb-8 text-center">{description}</p>
          {form}
        </div>
</section>
  )
}

export default HeroSection