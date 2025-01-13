import titanicPicture from '.././assets/titanic.jpg'
import theshiningPicture from '.././assets/theshining.png'
import bladerunnerPicture from '.././assets/bladerunner.png'
import './Movies.css'

export default function Movies() {

    return (
        <>
            <h1>Movies</h1>
            <h3>Out of the 3 choices below, pick one!</h3>

            <div className='allChoices'>
                <div className='titanic'>
                    <a href='/moviechosen/titanic'>
                    <img src={titanicPicture} className="picChoice" alt='picture 1' /> 
                    <h3>Titanic</h3>
                    </a>
                </div>

                <div className='theshining'>
                    <a href='/moviechosen/theshining'>
                    <img src={theshiningPicture} className="picChoice" alt='picture 2' />
                    <h3>The Shining</h3>
                    </a>
                </div>

                <div className='bladerunner'>
                    <a href='/moviechosen/bladerunner'>
                    <img src={bladerunnerPicture} className="picChoice" alt='picture 3' />
                    <h3>Bladerunner</h3>
                    </a>
                </div>
            </div>

            <div className='card'>
                <a href='/'>
                    <button className='buttonMovies'>Back To Home!</button>
                </a>
            </div>
        </>
    )

}