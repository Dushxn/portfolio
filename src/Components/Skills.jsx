import React from 'react'
import HTML from '../assets/html.png'
import CSS from '../assets/css.png'
import JS from '../assets/javascript.png'
import ReactIcon from '../assets/reactdark.png'
import Node from '../assets/nodejs.png'
import Figma from '../assets/figma.png'
import Tailwind from '../assets/tailwindcss.png'
import {motion} from 'framer-motion'

const Skills = () => {
  return (
    <motion.div className='mb-40 relative overflow-hidden'
    initial={{y:-50,opacity:0,}}
    whileInView={{y:0,opacity:1}}
    transition={{delay:0.1, 
      duration:0.8,
      ease: "easeOut"
    }}
    id='Skills'
   >
        <div className='absolute' id='bgBlur' >
        <svg width="1500" height="800" viewBox="0 0 1440 2103" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_12_150)">
<path d="M411.335 926.382C515.023 836.026 607.515 924.978 640.8 980.749C637.159 999.197 646.949 1072.96 715.229 1220.44C800.579 1404.78 470 1217.29 343.212 1238.61C216.423 1259.93 281.726 1039.33 411.335 926.382Z" fill="#D958FF"/>
<path d="M411.335 926.382C515.023 836.026 607.515 924.978 640.8 980.749C637.159 999.197 646.949 1072.96 715.229 1220.44C800.579 1404.78 470 1217.29 343.212 1238.61C216.423 1259.93 281.726 1039.33 411.335 926.382Z" stroke="black"/>
</g>
<g filter="url(#filter1_f_12_150)">
<path d="M868.313 839.517C972 749.161 1064.49 838.113 1097.78 893.884C1094.14 912.332 1103.93 986.098 1172.21 1133.57C1257.56 1317.92 926.978 1130.43 800.189 1151.75C673.401 1173.06 738.703 952.463 868.313 839.517Z" fill="#865DFF"/>
<path d="M868.313 839.517C972 749.161 1064.49 838.113 1097.78 893.884C1094.14 912.332 1103.93 986.098 1172.21 1133.57C1257.56 1317.92 926.978 1130.43 800.189 1151.75C673.401 1173.06 738.703 952.463 868.313 839.517Z" stroke="black"/>
</g>
<defs>
<filter id="filter0_f_12_150" x="-525.628" y="87.2141" width="2055.25" height="2015.63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="350" result="effect1_foregroundBlur_12_150"/>
</filter>
<filter id="filter1_f_12_150" x="-68.6505" y="0.348999" width="2055.25" height="2015.63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="400" result="effect1_foregroundBlur_12_150"/>
</filter>
</defs>
        </svg>
        </div>
        <div className='' id='skill-text'>
      <h1 className=' text-center text-5xl about-title '> My Expertise Area</h1>
      <h3 className=' text-center text-xl about-title mt-5 '>what I know</h3>
      <div className='icon-wrapper2'>
        <div className='first-set mt-10'>
            <motion.img src={HTML} alt="" className='iconx' id='html'
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{delay:0.1, duration:0.5}}
            />
            <motion.img src={CSS} alt="" className='iconx' id='css'
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{delay:0.1, duration:0.5}}
            />
            <motion.img src={JS} alt="" className='iconx'
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{delay:0.1, duration:0.5}}
            />
            <motion.img src={Node} alt="" className='iconx'
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{delay:0.1, duration:0.5}}
            />
        </div>
        <div className='second-set mt-10'>
            <motion.img src={ReactIcon} alt="" className='iconx'
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{delay:0.1, duration:0.5}}
            />
            <motion.img src={Figma} alt="" className='iconx'
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{delay:0.1, duration:0.5}}
            />
            <motion.img src={Tailwind} alt="" className='iconx '
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{delay:0.1, duration:0.5}}
            />
        </div>
      </div>
      </div>
    </motion.div>
  )
}

export default Skills
