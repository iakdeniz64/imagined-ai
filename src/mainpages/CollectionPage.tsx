import { getCurrentUserInfo } from "../CallsToBackend";
import Button from "../components/Button";
import { useEffect, useState } from "react";

export default function CollectionPage() {
    const [userInfo, setUserInfo] = useState({ myusername: '', myurls: [] }); //.myusername = string, .myurls = array

    useEffect(() => {
        const currentUser = localStorage.getItem("CurrentUser")
        const currentJWT = localStorage.getItem("JWToken")
        getCurrentUserInfo(currentUser, currentJWT).then((element) =>
                        setUserInfo(element)
        )
    }, []);

    //copy url button, en download picture button. EN REMOVE FUNCT.
    //  functies here.

    const handleCopyToClipboard = (toCopyImage: string) => {
        navigator.clipboard.writeText(toCopyImage)
          .then(() => {
            console.log("Image URL copied to clipboard");
          })
          .catch((error) => {
            console.error("Failed to copy image URL to clipboard:", error);
          });
      };

    const handleDownload = () => {
        // TO DO:
    }

    const handleRemoveImage = () => {
        // TO DO:
    }

    // TO DO: REVELATION! Link expires in 2 hours. SO SAVE TO DB INSTEAD?
    // IF SO, change to limit 3 per day, to 'other' users. Also lower selection count (no 18 items)

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">Collection of {userInfo.myusername}</h2>
            {userInfo.myurls.length > 0 ? (
                <>
                    {(userInfo.myurls).map((url, index) => (
                            <div
                                className={`p-4 m-2 rounded shadow border border-gray-300 max-w-xl mx-auto transition-all duration-300`}
                                style={{ width: '400px', height: '400px' }}>
                                <h3 className="font-bold text-center mb-2">Picture number {index + 1}</h3>
                                <img
                                    src={url}
                                    alt={url}
                                    className="object-cover rounded w-full h-70 m-2"
                                />
                                <Button destination="#" buttontext='Copy URL' onClickFunction={() => handleCopyToClipboard(url)}/>
                                <Button destination="#" buttontext='Download' onClickFunction={() => handleDownload}/>
                                <Button destination="#" buttontext='Delete' onClickFunction={() => handleRemoveImage}/>
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