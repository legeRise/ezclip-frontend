import React, { useContext } from 'react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom';
import { login, getUserInfo } from '../../services/authService';
import StatusMessage from '../ui/StatusMessage';
import { UserContext } from '../../contexts/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleSignIn } from '../google/useGoogleSignIn';

const LoginForm = ({setIsAuthenticated}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  // Use the centralized Google sign-in hook
  const {
    handleGoogleSignIn,
    loading: googleLoading,
    error: googleError,
    result: googleResult,
  } = useGoogleSignIn(setIsAuthenticated);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error important if next time the result becomes available
    setResult(null); // Clear previous result 
    
    // Call the login function from authService
    setLoading(true);
        try {
          const data = await login(email, password);
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          setResult(data);
          setIsAuthenticated(true);
          const userInfo = await getUserInfo();
          setUserInfo(userInfo); // Set user info in context
          navigate('/generate-video', {replace : true}); // Redirect to text-to-video page
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
  }

  return (
    <form className="flex flex-col" onSubmit={handleLogin}>
      {error ? (
        <StatusMessage message={error} type="error" />
      ) : result && (
        <StatusMessage message="Login successful!" type="success" />
      )}

      {/* Google Sign-In Button */}
      <div className='flex justify-center items-center mb-4'>
        <GoogleLogin
          onSuccess={credentialResponse => {
            handleGoogleSignIn(credentialResponse);
          }}
          onError={() => {
            setError('Google sign-in failed');
          }}
        />
      </div>

      <input
        type="text"
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

      <Button
        type="submit"
        text="Sign In"
        loading={loading}
        disabled={loading}
      />

      <div className="mt-2 flex flex-col items-center">
        <span
          className="text-blue-400 cursor-pointer text-sm mb-5"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </span>
        <span className="text-center text-sm">
          Don't have an Account?{' '}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </span>
      </div>
    </form>
  )
}

export default LoginForm
