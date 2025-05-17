import React, { useState } from 'react'
import Button from '../ui/Button'
import { signup } from '../../services/authService';
import StatusMessage from '../ui/StatusMessage';

const SignupForm = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
    
  
  return (
    <form className="flex flex-col px-2" onSubmit={handleSubmit}>
    {error ? (
      <StatusMessage message={error} type="error" />
    ) : result && (
      <StatusMessage message={result?.message || "Signup successful!"} type="success" />
    )}

     <h1 className='text-xl mb-6 text-center'>Sign Up to Ezclip</h1>
     <div className="flex flex-col items-center py-4">
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
      </div>

    <div className="mt-2">
      Already a Member? Click to <span className='text-blue-400 cursor-pointer' onClick={() => props.setSelectedType('login')}>Login</span>
    </div>

    </form>
  )
}

export default SignupForm
