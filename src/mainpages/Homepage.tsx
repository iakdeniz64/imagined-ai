import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './styles/Homepage.css'
import Button from '../components/Button';
import { getCurrentUserInfo } from '../CallsToBackend'

export default function Homepage() {
    const [userText, setUserText] = useState('');
    const [userInfo, setUserInfo] = useState({ myusername: '', myurls: [] }); //.myusername = string, .myurls = array
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("JWToken")) {
            localStorage.setItem("JWToken", "")
        } else if (localStorage.getItem("JWToken")){
            const currentUser = localStorage.getItem("CurrentUser")
            const currentJWT = localStorage.getItem("JWToken")
            if (currentJWT && currentUser){
                getCurrentUserInfo(currentUser, currentJWT).then((element) =>
                    setUserInfo(element)
                )
                setUserText('You are logged in, ')
            }
        }
        else(console.log('Error...'))
    }, []);

    const handleLogoutClick = () => {
        localStorage.setItem("JWToken", "")
        localStorage.setItem("CurrentUser", "")
        localStorage.setItem("movieChoice", "")
        localStorage.setItem("userUrls", "")
        setUserText('')
        setUserInfo({ myusername: '', myurls: [] })
    }
    
    const handleCollectionClick = () => {
        localStorage.setItem('userUrls', JSON.stringify(userInfo.myurls));
        navigate('/collection')
    };

    return (
        <>
        <div className='flex flex-col'>
            <h1 className='flex self-center m-3'>Imagined</h1>
            <div className='m-2'>
                {!localStorage.getItem("JWToken") 
                ? <div className="selectionButtons">
                    <Button destination="/registration" buttontext="Registration" size='larger'/>
                    <Button destination="/login" buttontext="Login" size='larger' />
                </div>
                : <div className='flex flex-col m-1'>
                    <Button destination="/contentchoice" buttontext="Start Generating" size='larger'/>
                    <Button destination="#" buttontext="Check Collection" onClickFunction={handleCollectionClick}/>
                    {`${userText} ${userInfo.myusername}.`}
                    <Button destination='#' buttontext='Log Out' onClickFunction={handleLogoutClick}/>
                </div>}
            </div>
        </div>
        </>
    )
}