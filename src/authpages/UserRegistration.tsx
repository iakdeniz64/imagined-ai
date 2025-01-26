import { useState } from 'react';
import { registerUser, getAllUsers } from '../CallsToBackend';

export default function UserRegistration(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getAllButtonHandler = async (event: any) => {
    event.preventDefault();
    
    const allUsers = await getAllUsers()
    console.log(allUsers)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    try {
      const response = await registerUser(username, password);

      setSuccess(response.message);
      setUsername('');
      setPassword('');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
        <div>
        <h2>Registration</h2>
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
            <button type="submit">Register</button>
        </form>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>
        <div className='getallButton'>
            <button type='submit' onClick={getAllButtonHandler}>Get All Current Users!</button>
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
