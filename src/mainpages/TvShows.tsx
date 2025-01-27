import gameofthronesPicture from '.././assets/got.jpg'
import theofficePicture from '.././assets/theoffice.jpg'
import breakingbadPicture from '.././assets/breakingbad.png'

export default function TvShows() {

    const choiceHandler = (name: string) => {
        localStorage.setItem("tvShowChoice", "")
        localStorage.setItem("tvShowChoice", JSON.stringify(name))
        console.log(localStorage.getItem("tvShowChoice"))
    }

    return (
        <>
            <h1>Tv Shows</h1>
            <h3>Out of the 3 choices below, pick one!</h3>

            <div className='allChoices'>
                <div className='gameofthrones' onClick={() => choiceHandler('Game of Thrones')}>
                    <a href='/tvshowchosen/gameofthrones'>
                    <img src={gameofthronesPicture} className="picChoice" alt='picture 1' /> 
                    <h3>Game of Thrones</h3>
                    </a>
                </div>

                <div className='theoffice' onClick={() => choiceHandler('The Office')}>
                    <a href='/tvshowchosen/theoffice'>
                    <img src={theofficePicture} className="picChoice" alt='picture 2' />
                    <h3>The Office</h3>
                    </a>
                </div>

                <div className='breakingbad' onClick={() => choiceHandler('Breaking Bad')}>
                    <a href='/tvshowchosen/breakingbad'>
                    <img src={breakingbadPicture} className="picChoice" alt='picture 3' />
                    <h3>Breaking Bad</h3>
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