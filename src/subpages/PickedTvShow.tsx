import { useEffect, useState } from 'react';
import gameofthronesPicture from '.././assets/got.jpg'
import theofficePicture from '.././assets/theoffice.jpg'
import breakingbadPicture from '.././assets/breakingbad.png'
import { useNavigate } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import OpenAiTool from '../OpenAITool';

export default function PickedTvShow(){
    const navigate = useNavigate();
    const [chosenTvShow, setChosenTvShow] = useState('')
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
      const result = await OpenAiTool(chosenTvShow, 'tv show');
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
        if (!localStorage.getItem("tvShowChoice")){
            console.log("No tv show chosen, redirecting to Home.")
            navigate('/');
        } else {
            setChosenTvShow(JSON.parse(localStorage.getItem("tvShowChoice")));
            if (JSON.parse(localStorage.getItem("tvShowChoice")) == "Game of Thrones"){
                setPicture(gameofthronesPicture);
            }
        
            else if (JSON.parse(localStorage.getItem("tvShowChoice")) == "The Office"){
                setPicture(theofficePicture);
            }
        
            else if (JSON.parse(localStorage.getItem("tvShowChoice")) == "Breaking Bad"){
                setPicture(breakingbadPicture);
            }
        }
    }, []);
    
    return(
        <>
            <h2>You chose</h2>
            <div className='chosenTvShow'>
                    <img src={picture} className="picChoice" />
                    <h3 className='subtitle'>{chosenTvShow}</h3>
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
                <a href='/tvshows'>
                    <button className='buttonMovies'>Back To TV Shows!</button>
                </a>
                <a href='/'>
                    <button className='buttonMovies'>Back To Home!</button>
                </a>
            </div>
        </>
    )
}