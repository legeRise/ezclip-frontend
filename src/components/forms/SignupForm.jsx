import React, { useState } from 'react'
import { signup, resendActivationEmail } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleSignIn } from '../google/useGoogleSignIn';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Alert, AlertDescription } from '@/components/shadcn/alert';
import { Separator } from '@/components/shadcn/separator';
import { Loader2, AlertCircle, CheckCircle2, Mail } from 'lucide-react';

const SignupForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resendStatus, setResendStatus] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleGoogleSignIn,
    loading: googleLoading,
    error: googleError,
    result: googleResult,
  } = useGoogleSignIn(props.setIsAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const data = await signup(email, password, confirmPassword);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleResendActivation = async () => {
    setResendStatus(null);
    setResendLoading(true);
    try {
      await resendActivationEmail(email);
      setResendStatus("Activation email resent! Please check your inbox.");
    } catch (err) {
      setResendStatus("Could not resend activation email.");
    } finally {
      setResendLoading(false);
    }
  };
    
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            {error.toLowerCase().includes("email") && (
              <div className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResendActivation}
                  disabled={resendLoading}
                >
                  {resendLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                  <Mail className="mr-2 h-3 w-3" />
                  Resend Activation Email
                </Button>
                {resendStatus && (
                  <p className="text-xs mt-1 text-muted-foreground">{resendStatus}</p>
                )}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {result && (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            {result?.message || "Signup successful! Please check your inbox for the verification link."}
          </AlertDescription>
        </Alert>
      )}

      {/* Google Sign-In Button */}
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={credentialResponse => {
            handleGoogleSignIn(credentialResponse);
          }}
          onError={() => {
            console.log('Google Sign in Failed');
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
          placeholder="Create a password (min. 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          maxLength={150}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign Up
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          className="text-primary hover:underline font-medium"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default SignupForm
