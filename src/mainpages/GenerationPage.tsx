import { useLocation } from "react-router-dom";
import ChoiceDisplay from "../components/ChoiceDisplay";

export default function GenerationPage() {

    const location = useLocation();
    const { id, name, type, year, image } = location.state || {};

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
        </>
    )
    //Add hier nog de generation button, laat foto netjes eronder zien (met zelfde afmetingen)
    //daarna, add copy url, en save url to collection.
    //hierna komt nog url pagina, waar alle urls te zien zijn (met crud), en dan add fotos
    //daarna finish project nadat mobiel er ook goed uitziet.
}
