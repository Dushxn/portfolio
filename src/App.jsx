import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Shared/Navbar'
import Contact from './Components/Contact'


const App = () => {
  return (
    <div>
      <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/contactme' element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
