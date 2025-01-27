import { useState, useEffect } from 'react'
import './styles/Homepage.css'
import Button from '../components/Button';
import { getCurrentUserInfo } from '../CallsToBackend'

export default function Homepage() {
    const [userText, setUserText] = useState('');
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        if (!localStorage.getItem("JWToken")) {
            localStorage.setItem("JWToken", "")
        } else if (localStorage.getItem("JWToken")){
            // GET User INfO, add in setUserTExt!
            const currentUser = localStorage.getItem("CurrentUser")
            const currentJWT = localStorage.getItem("JWToken")
            getCurrentUserInfo(currentUser, currentJWT).then((element) =>
                setUserInfo(element) //myusername = string, myurls = array
            )
            setUserText('You are logged in, ')
        }
        else(console.log('Error...'))
    }, []);

    // niet goed.. allen alten zien als logged in
    const handleLogoutClick = () => {
        localStorage.setItem("JWToken", "")
        localStorage.setItem("CurrentUser", "")
        setUserText('')
    }

    return (
        <>
        <div className='flex flex-col'>
            <h1 className='flex text-center'>Imagined</h1>
            <Button destination="/contentchoice" buttontext="Start Generating!" size='larger'/>
            <div className='regloginButtons'>
                {!localStorage.getItem("JWToken") 
                ? <div className="selectionButtons">
                    <Button destination="/registration" buttontext="Registration"/>
                    <Button destination="/login" buttontext="Login"/>
                </div>
                : <div className='loggedInUser'>
                {`${userText} ${userInfo.myusername}. `}
                <button onClick={handleLogoutClick}>Log Out</button>
                </div>}
            </div>
        </div>

        </>
    )
}