import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Movies from './mainpages/Movies'
import Homepage from './mainpages/Homepage'
import './App.css'
import PickedMovie from './subpages/PickedMovie'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path='/moviechosen/*' element={<PickedMovie/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
