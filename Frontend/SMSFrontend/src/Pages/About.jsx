import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import AboutUs from '../assets/Photos/AboutUsIcon.png'
import Logo from '../assets/Photos/Logo.png'
import DelhiIcon from '../assets/Photos/DelhiIcon.png'
import MumbaiIcon from '../assets/Photos/MumbaiIcon.png'
import IndoreIcon from '../assets/Photos/IndoreIcon.png'
import PuneIcon from '../assets/Photos/PuneIcon.png'
import JodhpurIcon from '../assets/Photos/JodhpurIcon.png'
import JaipurIcon from '../assets/Photos/JaipurIcon.png'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='w-[98%] mx-auto px-4 py-8 flex-grow'>
        <div className='h-[25vh] bg-gradient-to-r from-[#2a9b93] to-[#5f95c7] flex flex-col justify-center rounded-t-lg '>
          <div className='bg-white h-[70px] text-[45px] flex items-center pl-10'>
            <div>About Us</div>
            <img src={AboutUs} alt="About Us" className='w-[50px] h-[50px] ml-8 mt-[-70px]' />
          </div>
        </div>
        <div className='mt-10 '>
          {/* Card 2 */}
          <motion.div
            className='w-[98%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-8'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className=' flex flex-col md:flex-row-reverse justify-center items-center'>
              <div className='md:w-1/2 p-8'>
                <h3 className='text-[30px] font-bold mb-4 text-blue-600'>Our Story</h3>
                <p className='text-[18px] text-gray-800 mb-4'>
                  Welcome to AV School Management System, where we're revolutionizing the way educational institutions operate. Founded with a vision to streamline school administration and enhance the learning experience, we've been at the forefront of educational technology since our inception.
                </p>
                <p className='text-[18px] text-gray-800 mb-4'>
                  Our platform combines cutting-edge technology with user-friendly design to create a comprehensive solution that addresses the unique challenges faced by modern educational institutions. We understand that every school has its own needs, which is why we've built a flexible and scalable system that can adapt to your specific requirements.
                </p>
                <p className='text-[18px] text-gray-800'>
                  With a team of experienced educators and technology experts, we're committed to providing the tools and support needed to create an efficient, engaging, and successful learning environment for students, teachers, and administrators alike.
                </p>
              </div>
              <div className='md:w-1/2 bg-blue-50 flex items-center justify-center'>
                <img src={Logo} alt="Teacher Portal" className='' />
              </div>
            </div>
          </motion.div>
        </div>

        <div className='mt-20'>
          <p className='text-[30px] font-bold text-blue-600 text-center'>Where are we?</p>
        </div>

        <div className='mt-10 w-[98%] mx-auto'>
          <marquee behavior="" direction="left" className='text-[20px] font-bold bg-blue-50 rounded-lg p-4'>
            <div className='flex flex-row'>
              <div className='ml-20 flex flex-col items-center justify-center'>
                <img src={DelhiIcon} alt="Teacher Portal" className='' />
                <p>Delhi</p>
              </div>
              <div className='ml-20 flex flex-col items-center justify-center'>
                <img src={MumbaiIcon} alt="Teacher Portal" className='' />
                <p>Mumbai</p>
              </div>
              <div className='ml-20 flex flex-col items-center justify-center'>
                <img src={JaipurIcon} alt="Teacher Portal" className='' />
                <p>Jaipur</p>
              </div>
              <div className='ml-20 flex flex-col items-center justify-center'>
                <img src={IndoreIcon} alt="Teacher Portal" className='' />
                <p>Indore</p>
              </div>
              
              <div className='ml-20 flex flex-col items-center justify-center'>
                <img src={JodhpurIcon} alt="Teacher Portal" className='' />
                <p>Jodhpur</p>
              </div>
              <div className='ml-20 flex flex-col items-center justify-center'>
                <img src={PuneIcon} alt="Teacher Portal" className='' />
                <p>Pune</p>
              </div>
              
              
            </div>
          </marquee>
        </div>
      </div>
      <Footer />
    </div>
  )
} 