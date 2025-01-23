import './Homepage.css'
import axios from 'axios';

export default function Homepage() {

    const getUsersTest = () => {
        axios.get('http://localhost:5000/users')
            .then((response) => {
                console.log('Users:', response.data);  // Handle the response data (users list)
                return (response.data)
            })
            .catch((error) => {
                console.error('Error fetching users:', error);  // Handle errors
            });
    }

    localStorage.setItem("movieChoice", "")
    return (
        <>
        <h1 className='mainTitle'>Imagined</h1>
            <div className="selectionButtons">
                <div className='card'>
                    <h2>
                        <a href='/movies'>
                            <button className='buttonMovies'>Movies</button>
                        </a>
                    </h2>
                </div>
                <div className='card'>
                    <h2>
                        <a href='/tvshows'>
                            <button className='buttonTvShows'>TV Shows</button>
                        </a>
                    </h2>
                </div>
                <div className='card'>
                    <h2>
                        <a href='/anime'>
                            <button className='buttonAnime'>Anime</button>
                        </a>
                    </h2>
                </div>
            </div>
            <button className='buttonUsers' onClick={getUsersTest}>Get test</button>
        </>
    )
}