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
import UserLogin from './authpages/UserLogin'
import ContentChoiceMenu from './mainpages/ContentChoiceMenu'
import GenerationPage from './mainpages/GenerationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path='/registration' element={<UserRegistration/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/contentchoice' element={<ContentChoiceMenu/>} />
        <Route path='/contentchoice/:id' element={<GenerationPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
