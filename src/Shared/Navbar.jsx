import React from 'react'
import TD from '../assets/TD.png'
import {motion} from 'framer-motion'
import {CiDark} from 'react-icons/ci'
import {useState, useEffect} from 'react'


const Navbar = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme')||'dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <motion.div className='flex flex-wrap justify-between p-4' id='Navbar'
    initial={{y:-50}}
    whileInView={{y:0}}
    transition={{delay:0.1, duration:0.3}}
    >
        <div className='flex'>
        <img src={TD} alt="" className='h-12 w-12 my-1'/>
        <a href=""><CiDark className='text-3xl ml-5 mt-3 toggler' onClick={toggleTheme}/></a>
        </div>
        <div className=' links mx-10'>
 
        <a href='#AboutMe' className='p-4'>About me</a>
        <a href='#Skills' className='p-4'>Skills</a>
        <a href='#Projects' className='p-4'>Projects</a>
        <a className='BTN p-4 rounded-lg text-white font-bold text-center ' href='#ContactMe'>Contact Me</a>
        
        </div>
    </motion.div>
  )
}

export default Navbar
