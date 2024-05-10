import React from 'react'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className=' overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-200 selection:text-black'>
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className=' container mx-auto px-8'>
        <Navbar />
      </div>
       
    </div>
  )
}

export default App
