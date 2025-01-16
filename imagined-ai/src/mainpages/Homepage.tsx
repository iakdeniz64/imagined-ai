import './Homepage.css'

export default function Homepage() {
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
        </>
    )
}