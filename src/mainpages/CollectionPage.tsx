import { useNavigate } from "react-router-dom";
import { getCurrentUserInfo, removeImageUrl } from "../CallsToBackend";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import JsFileDownloader from 'js-file-downloader';

export default function CollectionPage() {
    const [userInfo, setUserInfo] = useState({ myusername: '', myurls: [] }); //.myusername = string, .myurls = array
    const currentUser = localStorage.getItem("CurrentUser")
    const currentJWT = localStorage.getItem("JWToken")
    const navigate = useNavigate();

    useEffect(() => {
        if ((localStorage.getItem("JWToken")) == '' || (localStorage.getItem("CurrentUser")) == '') {
            navigate('/')

        } else {
            getCurrentUserInfo((localStorage.getItem("CurrentUser")), (localStorage.getItem("JWToken"))).
            then((element) =>
                setUserInfo(element)
            )
        }
    }, []);

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
        if (currentJWT !== ''){
            try {
                const renewedList = await removeImageUrl(url, currentJWT).then((element) => {
                    return {
                        myusername: currentUser,
                        myurls: element.urls,
                    };
                });
    
                setUserInfo(renewedList);
            } catch (error) {
                console.error('Error removing image:', error);
            }
        }
    }

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
                    <h2 className="font-bold m-2"> No pictures added yet! </h2>
                    <Button destination="/contentchoice" buttontext="Start Generating" size='larger'/>
                </div>
            )}
                <Button destination="/" buttontext="Back to Home" size="larger" />
        </div>
    );
}