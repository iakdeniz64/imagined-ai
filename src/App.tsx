import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Movies from './mainpages/Movies'
import Homepage from './mainpages/Homepage'
import PickedMovie from './subpages/PickedMovie'
import TvShows from './mainpages/TvShows'
import PickedTvShow from './subpages/PickedTvShow'
import Anime from './mainpages/Anime'
import PickedAnime from './subpages/PickedAnime'
import './App.css'
import UserRegistration from './authpages/UserRegistration'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path='/moviechosen/*' element={<PickedMovie/>} />
        <Route path="/tvshows" element={<TvShows/>} />
        <Route path='/tvshowchosen/*' element={<PickedTvShow/>} />
        <Route path='/anime' element={<Anime/>} />
        <Route path='/animechosen/*' element={<PickedAnime/>} />
        <Route path='/registration' element={<UserRegistration/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
