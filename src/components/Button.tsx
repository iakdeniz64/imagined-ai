import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Button({ destination, buttontext, size = "default" }: { destination: string; buttontext: string; size?: "smaller" | "default" | "larger" }) {
    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState (1);

    useEffect(() => {
        if (size == 'smaller'){
            setFontSize(0.875)
        } else if (size == 'larger'){
            setFontSize(1.25)
        }
    }, []);

    const onClickButtonHandler = () => {
        navigate(destination)
    }

    return (
        <button className='button' onClick={onClickButtonHandler} style= {{fontSize: (`${fontSize}em`)}} >{buttontext}</button>
    )
}
