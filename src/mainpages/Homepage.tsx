import { useState, useEffect } from 'react'
import './Homepage.css'
import Button from '../components/Button';

export default function Homepage() {
    const [userText, setUserText] = useState('Not logged in...');

    useEffect(() => {
        if (!localStorage.getItem("JWToken")) {
            localStorage.setItem("JWToken", "")
        } else if (localStorage.getItem("JWToken")){
            setUserText('Logged In!')
        }
        else(console.log('what now?'))
    }, []);

    // niet goed.. allen alten zien als logged in
    const handleLogoutClick = () => {
        localStorage.setItem("JWToken", "")
        setUserText('Not logged in...')
    }

    return (
        <>
            <h1>Imagined</h1>
                <Button destination="/movies" buttontext="Movies" size='larger'/>
                <Button destination="/tvshows" buttontext="TV Shows" size='larger'/>
                <Button destination="/anime" buttontext="Anime" size='larger'/>
            <div className='regloginButtons'>
                {!localStorage.getItem("JWToken") 
                ? <div className="selectionButtons">
                <Button destination="/registration" buttontext="Registration"/>
                    <Button destination="/login" buttontext="Login"/> </div>
                : <button onClick={handleLogoutClick}>Log Out</button>
                }
            </div>
        </>
    )
}