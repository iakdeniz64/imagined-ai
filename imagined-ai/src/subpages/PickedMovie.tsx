import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import titanicPicture from '.././assets/titanic.jpg'
import theshiningPicture from '.././assets/theshining.png'
import bladerunnerPicture from '.././assets/bladerunner.png'
import './PickedMovie.css';

export default function PickedMovie(){
    const [widthStyle, setWidthStyle] = useState('300px');
    const [heightStyle, setHeightStyle] = useState('200px');

    const location = useLocation()
    let pathName = '';
    let newPic: any;
    let niceName = '';

    if (location.pathname == "/moviechosen/titanic"){
        pathName = 'titanic';
        niceName = 'Titanic';
        newPic = titanicPicture;
    }

    else if (location.pathname == "/moviechosen/theshining"){
        pathName = 'theshining';
        niceName = 'The Shining';
        newPic = theshiningPicture;
    }

    else if (location.pathname == "/moviechosen/bladerunner"){
        pathName = 'bladerunner';
        niceName = 'Bladerunner'
        newPic = bladerunnerPicture;
    }

    const randomNumberInRange = (min: any, max: any) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    const doSomething = () => {
        let chosenRandomNumber = 0;

        const dimensionsChoices = [100, 150, 200, 250, 300, 350, 400, 450, 500];

        chosenRandomNumber = randomNumberInRange(1, 9);
        setWidthStyle(dimensionsChoices[chosenRandomNumber]);
        console.log(chosenRandomNumber)

        chosenRandomNumber = randomNumberInRange(1, 9);
        setHeightStyle(dimensionsChoices[chosenRandomNumber]);
        console.log(chosenRandomNumber)

    }

    return(
        <>
            <h2>You chose</h2>
            <div className='chosenMovie'>
                    <img src={newPic} className="picChoice" alt={pathName} style={{ minWidth: widthStyle, maxWidth: widthStyle, minHeight: heightStyle, maxHeight: heightStyle}} />
                    <h3>{niceName}</h3>
                    <h3>
                        <div className='card'>
                            <button onClick={doSomething} className='changePicture'>Change this Picture!</button>
                        </div>
                    </h3>
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