import { useEffect, useState } from 'react';
import titanicPicture from '.././assets/titanic.jpg'
import theshiningPicture from '.././assets/theshining.png'
import bladerunnerPicture from '.././assets/bladerunner.png'
import { useNavigate } from "react-router-dom";
import './PickedMovie.css';
import OpenAI from 'openai';

const VITE_APP_API_KEY='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';

export default function PickedMovie(){
    const navigate = useNavigate();
    
    const [chosenMovie, setChosenMovie] = useState('')
    const [picture, setPicture] = useState('');

    //OpenAI Stuff
    const [generatedImage, setGeneratedImage] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [copyText, setCopyText]= useState('Copy URL')

    const openai = new OpenAI({
        apiKey: VITE_APP_API_KEY, // This is also the default, can be omitted
        dangerouslyAllowBrowser: true // This is DANGEROUS! Remove later!
      });

  const handleImageHandler = async (e) => {
    setCopyText('Copy URL');
    try {
      setIsLoading(true);
      e.preventDefault()
      const result = await openai.images.generate({
        prompt: (chosenMovie + ' movie'),
        n: 1,
        size: "512x512",
      });

      console.log(result, 'result')
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
                    <h3>{chosenMovie}</h3>
                    <h3>
                        <div className='card'>
                            <button onClick={handleImageHandler} className='changePicture'>Get a generated picture based on this title!</button>
                        </div>
                    </h3>
            </div>

            <div className="image__box">
                {loading ? (
                <>
                    <p>Please Wait!</p>
                    <p>This will only take a few seconds</p>
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
            </div>

            <div className='card'>
                <a href='/'>
                    <button className='buttonMovies'>Back To Home!</button>
                </a>
            </div>
        </>
    )
}