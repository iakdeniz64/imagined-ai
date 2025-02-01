import { useNavigate } from "react-router-dom";
import { getCurrentUserInfo, removeImageUrl } from "../CallsToBackend";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import JsFileDownloader from 'js-file-downloader';

export default function CollectionPage() {
    const [userInfo, setUserInfo] = useState({ myusername: '', myurls: [] }); //.myusername = string, .myurls = array
    const [copyText, setCopyText]= useState('Copy URL')
    const currentUser = localStorage.getItem("CurrentUser")
    const currentJWT = localStorage.getItem("JWToken")
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem("CurrentUser")
        const currentJWT = localStorage.getItem("JWToken")

        if (currentJWT == '' || currentUser == '') {
            navigate('/')

        } else {
            getCurrentUserInfo(currentUser, currentJWT).
            then((element) =>
                setUserInfo(element)
            )
        }
    }, []);
    console.log(userInfo)

    // TO DO: In the use effect here, get data based on jwt

    //copy url button, en download picture button. EN REMOVE FUNCT.
    //  functies here.

    const handleCopyToClipboard = (toCopyImage: string) => {
        navigator.clipboard.writeText(toCopyImage)
          .catch((error) => {
            console.error("Failed to copy image URL to clipboard:", error);
          });
      };

    const handleDownload = (url: string) => {
        new JsFileDownloader({url: url});
    }

    const handleRemoveImage = async (url: string) => {
        // TO DO:
        if (currentJWT !== ''){
            try {
                const renewedList = await removeImageUrl(url, currentJWT).then((element) => {
                    return {
                        myusername: currentUser,
                        myurls: element.urls, // Assuming element.urls is the new list
                    };
                });
    
                // Update state with the new user info
                setUserInfo(renewedList);
            } catch (error) {
                console.error('Error removing image:', error);
            }
        }

    }

    // TO DO: Dynamic BUTTONTEXT, just like generationpage
    // TO DO: Try to reuse stuff, instead of implementing it differently each time.

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">Collection of {userInfo.myusername}</h2>
            {userInfo.myurls.length > 0 ? (
                <>
                    {(userInfo.myurls).map((url, index) => (
                            <div
                                className={`p-4 m-2 rounded shadow border border-gray-300 max-w-xl mx-auto transition-all duration-300`}
                                style={{ width: '400px', height: '400px' }}>
                                <h3 className="font-bold text-center mb-1">Picture number {index + 1}</h3>
                                <img
                                    src={url}
                                    alt={url}
                                    className="object-cover rounded w-full h-70"
                                />
                                <Button destination="#" buttontext='Copy URL' onClickFunction={() => handleCopyToClipboard(url)}/>
                                <Button destination="#" buttontext='Download' onClickFunction={() => handleDownload(url)}/>
                                <Button destination="#" buttontext='Delete' onClickFunction={() => handleRemoveImage(url)}/>
                            </div>

                    ))}
                <Button destination="/contentchoice" buttontext="Generate More" size='larger'/>
                </>
            ) : (
                <div>
                    "No pictures added yet!"
                    <Button destination="/contentchoice" buttontext="Start Generating" size='larger'/>
                </div>
            )}
            <div className="home buttons">
                <Button destination="/" buttontext="Back to Home" />
            </div>
        </div>
    );
}
    // TO DO: Remove home buttons from className!