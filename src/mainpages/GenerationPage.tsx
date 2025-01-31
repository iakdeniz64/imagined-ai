import { useLocation } from "react-router-dom";
import ChoiceDisplay from "../components/ChoiceDisplay";
import { addImageUrl, getGeneratedImage, uploadImageToBB } from "../CallsToBackend";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { BeatLoader } from 'react-spinners'

export default function GenerationPage() {

    const location = useLocation();
    const { id, name, type, year, image } = location.state || {};
    const [generatedImage, setGeneratedImage] = useState('');
    const [loading, setIsLoading] = useState(false); // true = testing, false = intended!
    const [copyText, setCopyText]= useState('Copy (2h)')
    const [saveText, setSaveText]= useState('Add to Collection')
    const [downloadText, setDownloadText] = useState('Download')
    const [generatingText, setGeneratingText] = useState('Generating')

    const handleImageHandler = async (e) => {
        setCopyText('Copy (2h)');
        setSaveText('Save')
        try {
            setIsLoading(true);
            e.preventDefault();
        
            const result = await getGeneratedImage(name, type);
        
            if (result && result.data && result.data.length > 0) {
            setGeneratedImage(result.data[0].url);
            } else {
            console.error("No image returned from OpenAI");
            }
            setGeneratingText('')
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
            setCopyText("Copied")
          })
          .catch((error) => {
            console.error("Failed to copy image URL to clipboard:", error);
          });
      };

      const handleSaveToCollection = async () => {
        const currentJWT = localStorage.getItem("JWToken");
      
        // TO DO: Save button becomes disabled upon saving is complete.

        if (!currentJWT) {
            return;  // Handle redirection or login logic as needed
        }
      
        try {
            // TO DO: Use getCurrentUserInfo instead!

            // First, fetch the user's current collection (URLs)
            const userResponse = await axios.get('http://localhost:5000/my-data', {
                headers: {
                    Authorization: `Bearer ${currentJWT}`,
                }
            });
      
            // If the URLs are fetched successfully, check for the existing URL
            const existingUrls = userResponse.data.myurls || [];
      
            if (existingUrls.includes(generatedImage)) {
                // URL already exists, handle this case (show message, do nothing, etc.)
                console.log("This URL is already in your collection.");
                setGeneratingText("This URL is already in your collection.");
                return;
            }
      
            // URL doesn't exist, proceed to add it
            const uploadImg = await uploadImageToBB(generatedImage, currentJWT);
            if (uploadImg.error) {
                console.log("Failed to upload to collection:", uploadImg.error);
                setGeneratingText("Failed to upload to collection");
            } else {
                console.log("Uploaded successfully:", uploadImg);
                setGeneratingText("Uploaded successfully");
            }

            const response = await addImageUrl(uploadImg.data.image.url, currentJWT); // Only pass the generated image and JWT
      
            if (response.error) {
                console.log("Failed to save URL to collection:", response.error);
                setGeneratingText("Failed to save URL to collection");
            } else {
                console.log("URL added successfully:", response.urls);
                setGeneratingText("URL added successfully");
            }
        } catch (error) {
            console.error("Error saving to collection:", error);
            setGeneratingText("Error saving to collection");
        }
    };

    const handleDownload = async () => {
        setDownloadText('Downloaded')
    }

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
                <button onClick={handleImageHandler} className='changePicture'>Get a generated picture based on your choice!</button>
            </div>

                {loading ? (
                    <div className={`p-4 rounded shadow border border-gray-300 max-w-xs mx-auto transition-all duration-300 hover:shadow-lg`}>
                        <h2 className="text-2xl font-bold text-center mb-6">Generating Picture</h2>
                        <span className="font-bold text-xl mb-2"> <BeatLoader color="#ffffff" /> </span>
                    </div>
                ) : (
                    <>
                        {generatedImage && (
                        <div className={`justify-items-center items-center p-3 m-2 rounded shadow border border-gray-300 max-w-xl mx-auto transition-all duration-300`} 
                            style={{ width: '450px', height: '420px' }}>
                            <h2 className="text-2xl font-bold text-center mb-2">Generated Picture</h2>
                                <Button destination="#" buttontext={copyText} onClickFunction={handleCopyToClipboard} size="smaller"/>
                                <Button destination="#" buttontext={saveText} onClickFunction={handleSaveToCollection} size="smaller"/>
                                <Button destination="#" buttontext={downloadText} onClickFunction={handleDownload} size="smaller"/>
                            <img src={generatedImage} alt="" className="object-cover rounded w-full h-60 m-3" />
                            <div className="m-1 font-bold text-center">{generatingText}</div>
                        </div>
                        )} 
                    </>
                )}
            <div className="home buttons">
                <Button destination="/contentchoice" buttontext="Back To Choices"/>
                <Button destination="/collection" buttontext="Check Collection"/>
                <Button destination="/" buttontext="Back to Home"/>
            </div>
        </>
    )
    
    // TO DO: 
    //daarna, add copy url, en save url to collection.
    //hierna komt nog url pagina, waar alle urls te zien zijn (met crud), en dan add fotos
    //daarna finish project nadat mobiel er ook goed uitziet.
    // GENERATE IMAGE MOET OOK JWT VRAGEN
}
