import { useEffect, useState } from 'react';
import { registerUser, loginUser } from '../CallsToBackend';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';

export default function UserRegistration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await registerUser(username, password);
      setSuccess(response.message);
      const loginresponse = await loginUser(username, password);
      setSuccess(loginresponse.message);
      localStorage.setItem("JWToken", loginresponse.token)
      localStorage.setItem("CurrentUser", username)
      setUsername('');
      setPassword('');
      navigate('/')
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("JWToken")) {
      navigate('/');
    }
  }, []);

  return (
    <>
    <div className="max-w-lg mx-auto p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block font-medium">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <Button
          destination="#"
          buttontext="Register"
          type='submit'
        />
      </form>

      {error && <div className="mt-4 text-red-600">{error}</div>}
      {success && <div className="mt-4 text-green-600">{success}</div>}
    </div>
      <Button destination="/" buttontext="Back to Home"/>
    </>
  );
};
