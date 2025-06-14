import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { NavLink } from 'react-router-dom'
import HomePageBackground from '../assets/Photos/HomePagebackground1.jpg'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${HomePageBackground})` }}>
        <Navbar />
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-white text-4xl text-[40px] font-bold bg-black bg-opacity-20 px-4 py-2 rounded-lg'>Welcome to SMS</h1>
          <p className='text-black text-[25px] bg-white bg-opacity-30 px-4 py-2 rounded-lg rounded-[8px]'>The best platform for the management.</p>
          <marquee className='text-white text-xl mt-4 bg-black bg-opacity-20 px-4 py-2 rounded-lg w-[80%]'>Welcome to our School Management System - The most comprehensive solution for educational institutions</marquee>
          <NavLink 
            to="/read" 
            className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Read More About Us
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  )
}
