import titanicPicture from '.././assets/titanic.jpg'
import theshiningPicture from '.././assets/theshining.png'
import bladerunnerPicture from '.././assets/bladerunner.png'
import Button from '../components/Button'
import './Movies.css'

export default function Movies() {

    const choiceHandler = (name: string) => {
        localStorage.setItem("movieChoice", "") // misschien dit hierboven zetten?
        localStorage.setItem("movieChoice", JSON.stringify(name))
        console.log(localStorage.getItem("movieChoice"))
    }

    return (
        <>
            <h1>Movies</h1>
            <h2>Pick one</h2>

            <div className='allChoices'>
                <div className='titanic' onClick={() => choiceHandler('Titanic')}>
                    <a href='/moviechosen/titanic'>
                    <img src={titanicPicture} className="picChoice" alt='picture 1' /> 
                    <h3>Titanic</h3>
                    </a>
                </div>

                <div className='theshining' onClick={() => choiceHandler('The Shining')}>
                    <a href='/moviechosen/theshining'>
                    <img src={theshiningPicture} className="picChoice" alt='picture 2' />
                    <h3>The Shining</h3>
                    </a>
                </div>

                <div className='bladerunner' onClick={() => choiceHandler('Bladerunner')}>
                    <a href='/moviechosen/bladerunner'>
                    <img src={bladerunnerPicture} className="picChoice" alt='picture 3' />
                    <h3>Bladerunner</h3>
                    </a>
                </div>
            </div>
            
            <div className="selectionButtons">
                <Button destination="/" buttontext="Homepage" size='larger'/>
            </div>
        </>
    )

}