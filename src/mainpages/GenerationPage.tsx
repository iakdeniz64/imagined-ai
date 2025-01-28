import { useLocation } from "react-router-dom";
import ChoiceDisplay from "../components/ChoiceDisplay";
import { getGeneratedImage } from "../CallsToBackend";
import { useState } from "react";
import Button from "../components/Button";

export default function GenerationPage() {

    const location = useLocation();
    const { id, name, type, year, image } = location.state || {};
    const [generatedImage, setGeneratedImage] = useState('');
    const [loading, setIsLoading] = useState(false); // true = testing, false = intended!
    const [copyText, setCopyText]= useState('Copy URL')

    const handleImageHandler = async (e) => {
        setCopyText('Copy URL');
        try {
            setIsLoading(true);
            e.preventDefault();
        
            const result = await getGeneratedImage(name, type);
        
            if (result && result.data && result.data.length > 0) {
            setGeneratedImage(result.data[0].url);
            } else {
            console.error("No image returned from OpenAI");
            }
        
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

    return (
        <>
            <ChoiceDisplay
                key={id}
                id={id}
                name={name}
                type={type}
                year={year}
                image={image}
                isClickable={false}
            />

            <div className='m-2'>
                <button onClick={handleImageHandler} className='changePicture'>Get a generated picture based on this title!</button>
            </div>

            <div className="image__box">
                {loading ? (
                <>
                    <span className="font-bold text-xl mb-2">Generating Image... </span>
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
            <div className="home buttons">
                <Button destination="/contentchoice" buttontext="Back to choices"/>
                <Button destination="/" buttontext="Back to Home"/>
            </div>
        </>
    )
    // TO DO: 
    //Add hier nog de generation button, laat foto netjes eronder zien (met zelfde afmetingen)
    //daarna, add copy url, en save url to collection.
    //hierna komt nog url pagina, waar alle urls te zien zijn (met crud), en dan add fotos
    //daarna finish project nadat mobiel er ook goed uitziet.
}
