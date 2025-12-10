import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { login, getUserInfo } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleSignIn } from '../google/useGoogleSignIn';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Alert, AlertDescription } from '@/components/shadcn/alert';
import { Separator } from '@/components/shadcn/separator';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const LoginForm = ({setIsAuthenticated}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const {
    handleGoogleSignIn,
    loading: googleLoading,
    error: googleError,
    result: googleResult,
  } = useGoogleSignIn(setIsAuthenticated);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setResult(data);
      setIsAuthenticated(true);
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
      navigate('/generate-video', {replace : true});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {result && (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">Login successful!</AlertDescription>
        </Alert>
      )}

      {/* Google Sign-In Button */}
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={credentialResponse => {
            handleGoogleSignIn(credentialResponse);
          }}
          onError={() => {
            setError('Google sign-in failed');
          }}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          maxLength={150}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          maxLength={150}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>

      <div className="flex flex-col items-center gap-2 text-sm">
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
        <span className="text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </span>
      </div>
    </form>
  )
}

export default LoginForm
