import { useEffect, useState } from 'react';
import { loginUser } from '../CallsToBackend';
import { useNavigate } from "react-router-dom";

export default function UserLogin(){
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
      const response = await loginUser(username, password);

      setSuccess(response.message);
      localStorage.setItem("JWToken", response.token)
      // test line hieronder om username in localstorage te zetten
      localStorage.setItem("CurrentUser", username)
      setUsername('');
      setPassword('');
      navigate('/')
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    //Redirect back to homepage if logged in
    if (localStorage.getItem("JWToken")){
        navigate('/')
    }
}, []);

  return (
    <>
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="password">Password: </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit">Login</button>
        </form>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>

        <div className='card'>
            <h2>
                <a href='/'>
                    <button className='buttonHome'>Home!</button>
                </a>
            </h2>
        </div>
    </>
  );
};
