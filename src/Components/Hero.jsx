import React from 'react'
import Me from '../assets/Me1.png'
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaMedium, FaBehance } from 'react-icons/fa'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'


const Hero = () => {
  return (
    <div className='h-screen relative overflow-hidden' id='Hero'>
        <div className=''>
        <motion.svg className='svg' viewBox="0 0 1374 1303" fill="none" xmlns="http://www.w3.org/2000/svg"
        initial={{x:100}}
        animate={{
            
            x: ['-50%', '50%','-50%'] // Keyframes: Start at 0%, move to 100%, then back to 0%
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        >
<g filter="url(#filter0_f_12_124)">
<path d="M405.022 627.498C424.222 505.898 545.022 512.831 603.022 531.498C611.689 546.165 663.822 590.698 803.022 651.498C977.022 727.498 625.022 791.498 547.022 879.498C469.022 967.498 381.022 779.498 405.022 627.498Z" fill="#D958FF"/>
<path d="M405.022 627.498C424.222 505.898 545.022 512.831 603.022 531.498C611.689 546.165 663.822 590.698 803.022 651.498C977.022 727.498 625.022 791.498 547.022 879.498C469.022 967.498 381.022 779.498 405.022 627.498Z" stroke="black"/>
</g>
<g filter="url(#filter1_f_12_124)">
<path d="M680.022 303.498C699.222 181.898 820.022 188.831 878.022 207.498C886.689 222.165 938.822 266.698 1078.02 327.498C1252.02 403.498 900.022 467.498 822.022 555.498C744.022 643.498 656.022 455.498 680.022 303.498Z" fill="#865DFF"/>
<path d="M680.022 303.498C699.222 181.898 820.022 188.831 878.022 207.498C886.689 222.165 938.822 266.698 1078.02 327.498C1252.02 403.498 900.022 467.498 822.022 555.498C744.022 643.498 656.022 455.498 680.022 303.498Z" stroke="black"/>
</g>
<defs>
<filter id="filter0_f_12_124" x="0.500031" y="120.5" width="1250.74" height="1182.02" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_12_124"/>
</filter>
<filter id="filter1_f_12_124" x="275.5" y="-203.5" width="1250.74" height="1182.02" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_12_124"/>
</filter>
</defs>
        </motion.svg>
        </div>
        <div className='wrapper z-10 absolute'>
            <div className='sec1'>
                <motion.div className='info'
                initial={{scale:0, opacity:0}}
                whileInView={{scale:1 , opacity:1}}
                transition={{ duration:0.4}}
                >
                    <h1 className='text-white'>Tharindu Dushan</h1>
                    <h3 className=''>Passionate Developer | Designer</h3>
                    <div className='about-text w-90'>
                        <p>Performance-oriented software engineering undergraduate with a passion for developing and designing innovative solutions. My dedication to crafting efficient and elegant code drives my continuous learning and growth in the field.</p>
                    </div>
                 <a href="#ContactMe"> <button className='contactBTN p-2'>contact me</button></a> 
                </motion.div>
                <div>
                    <motion.img src={Me} alt="" className='image ' 
                    initial={{opacity:0 }}
                    whileInView={{opacity:1}}
                    transition={{delay:0.1, duration:0.8}}
                    />
                </div>
            </div>
            <div className='sec2'>
                <div className='box bg-white h-20 '>
                    <div className='icon-wrapper flex flex-wrap justify-evenly'>
                     <a href="https://www.facebook.com/tharindu.prime/">  <FaFacebook className='icon'/></a> 
                     <a href="https://www.instagram.com/_dushxn/">  <FaInstagram className='icon'/></a> 
                     <a href="https://www.linkedin.com/in/tharindu-mahindarathna-6577a9190/">  <FaLinkedin className='icon'/></a> 
                     <a href="https://github.com/Dushxn">  <FaGithub className='icon'/></a> 
                     <a href="https://medium.com/@tdmahindarathne">   <FaMedium className='icon'/></a> 
                     <a href="https://www.behance.net/mahindarathnetd">   <FaBehance className='icon'/></a> 
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Hero
