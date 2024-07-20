import React from 'react'
import Retro from '../assets/RetroDB.png'
import { FaGithub } from 'react-icons/fa6'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Shelter from '../assets/Shelter.png'
import Ella from '../assets/Ella.png'
import {motion} from 'framer-motion'


const Projects = () => {
  return (
    <div className='h-auto overflow-hidden relative bg-transparent mt-10' id='Projects'>
        <div className='rightSVG z-0 absolute'>
        <svg width="538" height="1709" viewBox="0 0 538 1709" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_21_204)">
<path d="M803.324 562.724C882.697 675.042 784.822 758.034 725.963 785.491C707.978 779.998 633.6 782.255 479.96 835.224C287.909 901.435 507.963 591.579 499.615 463.282C491.267 334.985 704.107 422.327 803.324 562.724Z" fill="#D958FF"/>
<path d="M803.324 562.724C882.697 675.042 784.822 758.034 725.963 785.491C707.978 779.998 633.6 782.255 479.96 835.224C287.909 901.435 507.963 591.579 499.615 463.282C491.267 334.985 704.107 422.327 803.324 562.724Z" stroke="black"/>
</g>
<g filter="url(#filter1_f_21_204)">
<path d="M843.388 1026.16C922.762 1138.47 824.887 1221.47 766.027 1248.92C748.043 1243.43 673.665 1245.69 520.025 1298.66C327.974 1364.87 548.028 1055.01 539.68 926.714C531.332 798.417 744.172 885.758 843.388 1026.16Z" fill="#865DFF"/>
<path d="M843.388 1026.16C922.762 1138.47 824.887 1221.47 766.027 1248.92C748.043 1243.43 673.665 1245.69 520.025 1298.66C327.974 1364.87 548.028 1055.01 539.68 926.714C531.332 798.417 744.172 885.758 843.388 1026.16Z" stroke="black"/>
</g>
<defs>
<filter id="filter0_f_21_204" x="0.568665" y="0.311523" width="1233.04" height="1244.58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_21_204"/>
</filter>
<filter id="filter1_f_21_204" x="40.6335" y="463.743" width="1233.04" height="1244.58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_21_204"/>
</filter>
</defs>
        </svg>
        </div>

        <div className='leftSVG z-0 absolute'>
        <svg width="551" height="1200" viewBox="0 0 551 1709" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_21_201)">
<path d="M80.3235 562.724C159.697 675.042 61.8216 758.034 2.9625 785.491C-15.0216 779.998 -89.3998 782.255 -243.04 835.224C-435.091 901.435 -215.037 591.579 -223.385 463.282C-231.733 334.985 -18.8929 422.327 80.3235 562.724Z" fill="#D958FF"/>
<path d="M80.3235 562.724C159.697 675.042 61.8216 758.034 2.9625 785.491C-15.0216 779.998 -89.3998 782.255 -243.04 835.224C-435.091 901.435 -215.037 591.579 -223.385 463.282C-231.733 334.985 -18.8929 422.327 80.3235 562.724Z" stroke="black"/>
</g>
<g filter="url(#filter1_f_21_201)">
<path d="M120.389 1026.16C199.762 1138.47 101.887 1221.47 43.0275 1248.92C25.0435 1243.43 -49.3348 1245.69 -202.975 1298.66C-395.026 1364.87 -174.972 1055.01 -183.32 926.714C-191.668 798.417 21.1722 885.758 120.389 1026.16Z" fill="#865DFF"/>
<path d="M120.389 1026.16C199.762 1138.47 101.887 1221.47 43.0275 1248.92C25.0435 1243.43 -49.3348 1245.69 -202.975 1298.66C-395.026 1364.87 -174.972 1055.01 -183.32 926.714C-191.668 798.417 21.1722 885.758 120.389 1026.16Z" stroke="black"/>
</g>
<defs>
<filter id="filter0_f_21_201" x="-722.431" y="0.311523" width="1233.04" height="1244.58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_21_201"/>
</filter>
<filter id="filter1_f_21_201" x="-682.366" y="463.743" width="1233.04" height="1244.58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_21_201"/>
</filter>
</defs>
        </svg>

        </div>
      <motion.h1 className='recent text-center text-5xl about-title z-10'
        initial={{y:-30,opacity:0,}}
        whileInView={{y:0,opacity:1}}
        transition={{ 
          duration:0.4,
          ease: "easeOut"
        }}
      >Recent Projects</motion.h1>
      <div className='grid grid-rows-3 mt-20 gap-40 mb-20 ' id='project-grid'>

        <div className='row1 grid grid-cols-2 relative'>
            <div className='row-set1'>
                <motion.img src={Retro} alt="" className=' h-96 w-1/3 rounded-lg absolute left-20'
                initial={{x:-200,opacity:0}}
                whileInView={{x:0,opacity:1}}
                transition={{ 
                  duration:0.8,
                  ease: "easeInOut"
                }}
                />
            </div>
            <motion.div
            initial={{x:200,opacity:0}}
            whileInView={{x:0,opacity:1}}
            transition={{ 
              duration:0.8,
              ease: "easeInOut"
            }}
            className='row-set2'>
            <h1 className='retro-title text-4xl font-semibold mt-10'>RetroDB</h1>
            <div className='retro'>
            <p>
            RetroDB is a movie and TV show review site where users can find information on popular, top-rated, currently playing, and upcoming movies and TV shows. The site is built using Vite + React and styled with Tailwind CSS.
            </p>
            </div>
            <div className='retro-icons flex flex-wrap '>
              <a href="https://github.com/Dushxn/MovieDetails">  <FaGithub className='text-4xl'/></a>
              <a href="https://retrodb.netlify.app/">  <FaExternalLinkAlt className='text-4xl ml-5'/></a>
            </div>
            </motion.div>
        </div>

        <div>
        <div className='row2 grid grid-cols-2 relative'>
            <motion.div className='row2-set1 relative left-20'
                initial={{x:-200,opacity:0}}
                whileInView={{x:0,opacity:1}}
                transition={{ 
                  duration:0.8,
                  ease: "easeInOut"
                }}
            >
            <h1 className='retro-title text-4xl font-semibold mt-10'>Shelter Vehicle Insurance System</h1>
            <div className='retro'>
            <p>
            Shelter-Vehicle-Insurance is an innovative vehicle insurance system developed as part of our first-year university project. This system streamlines and automates the services of vehicle insurance management companies, providing efficient and user-friendly solutions. Built using HTML, CSS, JavaScript, and a PHP backend, it showcases our dedication to creating impactful software solutions.
            </p>
            </div>
            <div className='retro-icons flex flex-wrap '>
              <a href="https://github.com/Dushxn/Shelter-Vehicle-Insurance">  <FaGithub className='text-4xl'/></a>
              <a href=""><FaExternalLinkAlt className='text-4xl ml-5'/></a>  
            </div> 
            </motion.div>
            <div className='shelter'>
                <motion.img src={Shelter} alt="" className='h-96  rounded-lg relative '
                    initial={{x:200,opacity:0}}
                    whileInView={{x:0,opacity:1}}
                    transition={{ 
                      duration:0.8,
                      ease: "easeInOut"
                    }}
                />
            </div>

        </div>
        </div>

        <div>
        <div className='row3 grid grid-cols-2 relative'>
            <div>
                <motion.img src={Ella} alt="" className=' h-96 w-1/3 rounded-lg absolute left-20'
                    initial={{x:-200,opacity:0}}
                    whileInView={{x:0,opacity:1}}
                    transition={{ 
                      duration:0.8,
                      ease: "easeInOut"
                    }}
                />
            </div>
            <motion.div
                initial={{x:200,opacity:0}}
                whileInView={{x:0,opacity:1}}
                transition={{ 
                  duration:0.8,
                  ease: "easeInOut"
                }}
                className='row3-set2'
            >
            <h1 className='retro-title text-4xl font-semibold mt-10'>Ella Jungle Resort</h1>
            <div className='retro'>
            <p>
            As part of our "IT Project" module, we developed a comprehensive application using the MERN stack. This project allowed us to enhance our skills in version control with Git, frontend development with React and Tailwind CSS, and server-side development with Express, Node.js, and MongoDB. The experience not only strengthened our technical expertise but also our ability to deliver robust, full-stack web applications.
            </p>
            </div>
            <div className='retro-icons flex flex-wrap '>
                <FaGithub className='text-4xl'/>
                <FaExternalLinkAlt className='text-4xl ml-5'/>
            </div>
            </motion.div>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Projects
