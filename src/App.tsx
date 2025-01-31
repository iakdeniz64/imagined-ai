import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './mainpages/Homepage'
import './App.css'
import UserRegistration from './authpages/UserRegistration'
import UserLogin from './authpages/UserLogin'
import ContentChoiceMenu from './mainpages/ContentChoiceMenu'
import GenerationPage from './mainpages/GenerationPage'
import CollectionPage from './mainpages/CollectionPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path='/registration' element={<UserRegistration/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/contentchoice' element={<ContentChoiceMenu/>} />
        <Route path='/contentchoice/:id' element={<GenerationPage/>} />
        <Route path='/collection' element={<CollectionPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
