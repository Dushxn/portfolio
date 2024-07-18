import React from 'react'
import TD from '../assets/TD.png'


const Navbar = () => {
  return (
    <div className='flex flex-wrap justify-evenly bg-transparent p-4' id='Navbar'>
        <img src={TD} alt="" className='h-12 w-12 my-1'/>
        <a href='/' className='p-4'>About me</a>
        <a href='/about' className='p-4'>Skills</a>
        <a href='/contact' className='p-4'>Projects</a>
        <a className='BTN p-4 rounded-lg text-white font-bold text-center hover:bg-white hover:text-black'>Contact Me</a>
    </div>
  )
}

export default Navbar
