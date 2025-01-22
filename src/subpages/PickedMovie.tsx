import { useEffect, useState } from 'react';
import titanicPicture from '.././assets/titanic.jpg'
import theshiningPicture from '.././assets/theshining.png'
import bladerunnerPicture from '.././assets/bladerunner.png'
import { useNavigate } from "react-router-dom";
import './PickedMovie.css';
import { BeatLoader } from 'react-spinners';
import OpenAiTool from '../OpenAITool';

export default function PickedMovie(){
    const navigate = useNavigate();
    const [chosenMovie, setChosenMovie] = useState('')
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
      const result = await OpenAiTool(chosenMovie, 'movie');
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
        if (!localStorage.getItem("movieChoice")){
            console.log("No movie chosen, redirecting to Home.")
            navigate('/');
        } else {
            setChosenMovie(JSON.parse(localStorage.getItem("movieChoice")));
            if (JSON.parse(localStorage.getItem("movieChoice")) == "Titanic"){
                setPicture(titanicPicture);
            }
        
            else if (JSON.parse(localStorage.getItem("movieChoice")) == "The Shining"){
                setPicture(theshiningPicture);
            }
        
            else if (JSON.parse(localStorage.getItem("movieChoice")) == "Bladerunner"){
                setPicture(bladerunnerPicture);
            }
        }
    }, []);
    
    return(
        <>
            <h2>You chose</h2>
            <div className='chosenMovie'>
                    <img src={picture} className="picChoice" />
                    <h3 className='subtitle'>{chosenMovie}</h3>
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
                <a href='/movies'>
                    <button className='buttonMovies'>Back To Movies!</button>
                </a>
                <a href='/'>
                    <button className='buttonMovies'>Back To Home!</button>
                </a>
            </div>
        </>
    )
}