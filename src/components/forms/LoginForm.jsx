import React from 'react'
import Button from '../ui/Button'
import { login } from '../../services/authService';
import StatusMessage from '../ui/StatusMessage';

const LoginForm = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  
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
          props.setIsAuthenticated(true);
          props.setSelectedType('text_to_video');
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
 

    <div className="mt-2 text-center">
      Don't have an Account? <span className='text-blue-400 cursor-pointer' onClick={() => props.setSelectedType('signup')}>Sign Up</span>
    </div>

    </form>
  )
}

export default LoginForm
