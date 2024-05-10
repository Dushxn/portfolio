import React from 'react'
import logo from '../assets/TdLogo.png'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div>
      <div className=' mb-10 flex items-center justify-between py-6'>
        <div className=' flex flex-shrink-0 items-center'>
            <img className=' mx-2 w-12 ml-5' src={logo} alt="" />
        </div>
        <div className=' flex m-8 justify-center items-center gap-4 text-2xl'>
            <FaLinkedin />
            <FaGithub />
            <FaSquareXTwitter />
            <FaInstagram />
        </div>
      </div>
    </div>
  )
}

export default Navbar
