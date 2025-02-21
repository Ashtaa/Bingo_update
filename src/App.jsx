import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Player from './component/Player'
import Admin from './component/Admin'
import CardChoosing from './CardChoosing'

function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/player' element={<CardChoosing />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
