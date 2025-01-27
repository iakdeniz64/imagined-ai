import onepiecePicture from '.././assets/onepiece.jpg'
import mhaPicture from '.././assets/mha.jpg'
import narutoPicture from '.././assets/naruto.jpg'

export default function Anime() {
    const choiceHandler = (name: string) => {
        localStorage.setItem("animeChoice", "")
        localStorage.setItem("animeChoice", JSON.stringify(name))
        console.log(localStorage.getItem("animeChoice"))
    }

    return (
        <>
            <h1>Anime</h1>
            <h3>Out of the 3 choices below, pick one!</h3>

            <div className='allChoices'>
                <div className='onepiece' onClick={() => choiceHandler('One Piece')}>
                    <a href='/animechosen/onepiece'>
                    <img src={onepiecePicture} className="picChoice" alt='picture 1' /> 
                    <h3>One Piece</h3>
                    </a>
                </div>

                <div className='myheroacademia' onClick={() => choiceHandler('My Hero Academia')}>
                    <a href='/animechosen/myheroacademia'>
                    <img src={mhaPicture} className="picChoice" alt='picture 2' />
                    <h3>My Hero Academia</h3>
                    </a>
                </div>

                <div className='naruto' onClick={() => choiceHandler('Naruto')}>
                    <a href='/animechosen/naruto'>
                    <img src={narutoPicture} className="picChoice" alt='picture 3' />
                    <h3>Naruto</h3>
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