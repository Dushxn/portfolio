import React from 'react'
import {motion} from 'framer-motion'

const Aboutme = () => {
  return (
    <motion.div className='z-20  mt-10' id='AboutMe'
    initial={{y:-50,opacity:0}}
    whileInView={{y:0,opacity:1}}
    transition={{delay:0.1, 
      duration:0.8,
      ease: "easeOut"
    }}
    >
        <div>
      <h1 className=' text-center text-5xl about-title'>About Me</h1>
      </div>
        <div className='aboutme flex flex-wrap justify-center'>
            <div className='aboutme-text w-1/2 p-4'>
            <p className=' text-center text-xl font-regular'>I am a results-driven third year Software Engineering undergraduate student at SLIIT who recognizes the significance of teamwork, productivity, time management and communication. My proven record of numerous leadership roles, including organizing events and handling members with effective teamwork make me a valuable asset to any team or department.</p>
            </div>
            <div>
            <button className='resume '>Resume</button>
            </div>
    </div>
    </motion.div>
  )
}

export default Aboutme
