import React,{ useRef } from 'react'
import {motion} from 'framer-motion'
import emailjs from 'emailjs-com';


const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
      .then((result) => {
          console.log(result.text);
          alert("Message sent successfully!");
      }, (error) => {
          console.log(error.text);
          alert("An error occurred, please try again.");
      });

    e.target.reset();
  };



  return (
    <div className='h-screen relative overflow-hidden mt-20 bg-transparent' id='ContactMe'>
        <div className='absolute z-0' id='bgBlur1'>
        <motion.svg width="1500" height="1000" viewBox="0 0 1440 2103" fill="none" xmlns="http://www.w3.org/2000/svg"
            initial={{x:100}}
            animate={{
                
                x: ['-10%', '30%','10%', '30%', '-10%'], // Keyframes: Start at 0%, move to 100%, then back to 0%
                y: ['-30%', '0%','-30%'] // Keyframes: Start at 0%, move to 100%, then back to 0%
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
              }}
        >
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
        </motion.svg>
        </div>
        
      <motion.h1 className=' text-center text-5xl about-title absolute mt-10' id='contact-title'
        initial={{y:-30,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{ 
          duration:0.4,
          ease: "easeOut"
        }}
      >Contact Me</motion.h1>

      <form ref={form} onSubmit={sendEmail} className='mt-14'>

      <div className='grid grid-rows-4 justify-center mt-20 gap-5 z-40 absolute' id='contact-form'>
        
        <div className="row">
            <div className='grid grid-cols-2 gap-10'>
                <div className='Name'>
                    <motion.input type="text" name='name' placeholder='Name' className='p-2 rounded-lg'
                    initial={{scale:0,opacity:0}}
                    whileInView={{scale:1,opacity:1}}
                    transition={{ 
                      duration:0.4,
                      ease: "easeOut"
                    }}
                    />
                </div>

                <div className='Name'>
                    <motion.input type="text" name='email' placeholder='Email' className='p-2 rounded-lg'
                        initial={{scale:0,opacity:0}}
                        whileInView={{scale:1,opacity:1}}
                        transition={{ 
                          duration:0.4,
                          ease: "easeOut"
                        }}
                    />
                </div>

            </div>
        </div>


        <div className="Name">
            <div>
                <motion.input type="text" name='subject' placeholder='subject'  className=' w-full'
                    initial={{scale:0,opacity:0}}
                    whileInView={{scale:1,opacity:1}}
                    transition={{ 
                      duration:0.4,
                      ease: "easeOut"
                    }}
                />
            </div>
        </div>


        <div className="Name">
            <div>
                <motion.textarea name="content" id="content"  placeholder='content' className=' w-full'
                    initial={{scale:0,opacity:0}}
                    whileInView={{scale:1,opacity:1}}
                    transition={{ 
                      duration:0.4,
                      ease: "easeOut"
                    }}
                ></motion.textarea>
            </div>
        </div>

        <div className="flex justify-center">
        <div className="flex justify-center" id='submitBTN'>
            <motion.input type="submit" value='Contact Me' className=' hover:cursor-pointer' 
                initial={{scale:0,opacity:0}}
                whileInView={{scale:1,opacity:1}}
                transition={{ 
                  duration:0.4,
                  ease: "easeOut"
                }}
            />
        </div>
        </div>
      </div>
      </form>
    </div>
  )
}

export default Contact
