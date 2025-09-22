import React, { useState } from 'react'
import Button from '../ui/Button'
import { signup, resendActivationEmail } from '../../services/authService';
import StatusMessage from '../ui/StatusMessage';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleSignIn } from '../google/useGoogleSignIn';

const SignupForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resendStatus, setResendStatus] = useState(null);
  const navigate = useNavigate();

  // Use the centralized Google sign-in hook
  const {
    handleGoogleSignIn,
    loading: googleLoading,
    error: googleError,
    result: googleResult,
  } = useGoogleSignIn(props.setIsAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error important if next time the result becomes available
    setResult(null); // Clear previous result 
    

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

        // Call the signup function from authService
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
    try {
      await resendActivationEmail(email);
      setResendStatus("Activation email resent! Please check your inbox.");
    } catch (err) {
      setResendStatus("Could not resend activation email.");
    }
  };
    
  
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {error ? (
        <>
          <StatusMessage message={error} type="error" />
          {error.toLowerCase().includes("email") && (
            <div className="my-2 flex flex-col items-center">
              <button
                onClick={handleResendActivation}
                type="button"
                className="text-sm px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-blue-600 border border-gray-200 transition"
              >
                Resend Activation Email
              </button>
              {resendStatus && (
                <span className="text-xs text-gray-500 my-1">{resendStatus}</span>
              )}
            </div>
          )}
        </>
      ) : result && (
        <StatusMessage message={result?.message || "Signup successful! Please Check Your Inbox for Verification Link"} type="success" />
      )}

      {/* Google Sign-In Button */}
      <div className='flex justify-center items-center mb-4'>
        <GoogleLogin
          onSuccess={credentialResponse => {
            handleGoogleSignIn(credentialResponse);
          }}
          onError={() => {
            console.log('Google Sign in Failed');
          }}
        />
      </div>

      <input
        type="email"
        maxLength={150}
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-xl mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
     <input
        type="password"
        maxLength={150}
        placeholder="Password"
        className="w-full p-3 border border-gray-300 rounded-xl mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
     <input
        type="password"
        maxLength={150}
        placeholder="Confirm Password"
        className="w-full p-3 border border-gray-300 rounded-xl mb-2"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        type="submit"
        text="Sign Up"
        loading={loading}
        disabled={loading}
      />
      {/* </div> */}

    <div className="mt-2 text-center">
      Already a Member? Click to <span className='text-blue-400 cursor-pointer' onClick={() => navigate('/login')}>Login</span>
    </div>

    </form>
  )
}

export default SignupForm
