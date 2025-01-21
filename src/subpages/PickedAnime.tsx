import { useEffect, useState } from 'react';
import onepiecePicture from '.././assets/onepiece.jpg'
import mhaPicture from '.././assets/mha.jpg'
import narutoPicture from '.././assets/naruto.jpg'
import { useNavigate } from "react-router-dom";
import './PickedAnime.css';
import { BeatLoader } from 'react-spinners';
import OpenAiTool from '../OpenAITool';

export default function PickedAnime(){
    const navigate = useNavigate();
    const [chosenAnime, setChosenAnime] = useState('')
    const [picture, setPicture] = useState('');

    //OpenAI Stuff
    const [generatedImage, setGeneratedImage] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [copyText, setCopyText]= useState('Copy URL')

  const handleImageHandler = async (e) => {
    setCopyText('Copy URL');
    try {
      setIsLoading(true);
      e.preventDefault()
      const result = await OpenAiTool(chosenAnime, 'anime');
      setGeneratedImage(result.data[0].url);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedImage)
      .then(() => {
        console.log("Image URL copied to clipboard");
        setCopyText("Copied URL!")
      })
      .catch((error) => {
        console.error("Failed to copy image URL to clipboard:", error);
      });
  };

    useEffect(() => {
        if (!localStorage.getItem("animeChoice")){
            console.log("No anime chosen, redirecting to Home.")
            navigate('/');
        } else {
            setChosenAnime(JSON.parse(localStorage.getItem("animeChoice")));
            if (JSON.parse(localStorage.getItem("animeChoice")) == "One Piece"){
                setPicture(onepiecePicture);
            }
        
            else if (JSON.parse(localStorage.getItem("animeChoice")) == "My Hero Academia"){
                setPicture(mhaPicture);
            }
        
            else if (JSON.parse(localStorage.getItem("animeChoice")) == "Naruto"){
                setPicture(narutoPicture);
            }
        }
    }, []);
    
    return(
        <>
            <h2>You chose</h2>
            <div className='chosenAnime'>
                    <img src={picture} className="picChoice" />
                    <h3>{chosenAnime}</h3>
                    <h3>
                        <div className='card'>
                            <button onClick={handleImageHandler} className='changePicture'>Get a generated picture based on this title!</button>
                        </div>
                    </h3>
            </div>

            <div className="image__box">
                {loading ? (
                <>
                    <span className="visually-hidden">Generating...
                        <BeatLoader color='#646cffaa' loading={loading} speedMultiplier={1} />
                    </span>
                </>
                ) : (
                <>
                    {generatedImage && (
                    <div className="image__actions">
                        <button onClick={handleCopyToClipboard}>{copyText}</button>
                    </div>
                    )}
                    <img src={generatedImage} alt="" />
                </>
                )}
            </div>

            <div className='card'>
                <a href='/anime'>
                    <button className='buttonMovies'>Back To Anime!</button>
                </a>
                <a href='/'>
                    <button className='buttonMovies'>Back To Home!</button>
                </a>
            </div>
        </>
    )
}