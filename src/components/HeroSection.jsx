import TextToVideoForm from './forms/TextToVideoForm';
import TitleToVideoForm from './forms/TitleToVideoForm';
import AudioToVideoForm from './forms/AudioToVideoForm';
import MyCreations from './forms/MyCreations';
import LoginForm from './forms/LoginForm';
import SingupForm from './forms/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/card';

const HeroSection = (props) => {
  const typeData = {
    'login': {
      heading: 'Welcome Back!',
      description: 'Sign in to start making videos effortlessly.',
      form: <LoginForm {...props} />,
    },
    'signup': {
      heading: 'Join Ezclip',
      description: 'Create an account to start making videos effortlessly.',
      form: <SingupForm {...props} />,
    },
    'text_to_video': {
      heading: 'Turn Your Story into a Video',
      description: 'Paste your script below and let AI create stunning videos for you.',
      form: <TextToVideoForm />,
    },
    'title_to_video': {
      heading: 'Turn Your Title into a Video',
      description: 'Paste your title below and EzClip will automatically create a video for you.',
      form: <TitleToVideoForm />,
    },
    'audio_to_video': {
      heading: 'Turn Your Audio into a Video',
      description: 'Upload your audio file below and EzClip will automatically create a video for you.',
      form: <AudioToVideoForm />,
    },
    'my_creations': {
      heading: 'My Creations',
      description: 'View and manage all your generated videos.',
      form: <MyCreations />
    }
  };

  const { heading, description, form } = typeData[props.selectedType];
  const wideTypes = ['text_to_video', 'title_to_video', 'audio_to_video', 'my_creations'];
  const isWide = wideTypes.includes(props.selectedType);

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex justify-center items-center px-4 py-12">
      <Card className={`w-full ${isWide ? 'max-w-3xl' : 'max-w-md'} shadow-xl border-primary/10`}>
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
            {heading}
          </CardTitle>
          {description && (
            <CardDescription className="text-base mt-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-4">
          {form}
        </CardContent>
      </Card>
    </section>
  );
};

export default HeroSection;
