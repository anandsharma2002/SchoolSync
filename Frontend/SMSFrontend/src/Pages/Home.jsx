import React from 'react'
import Navbar from '../Components/Navbar'
import HomePageBackground from '../assets/Photos/HomePagebackground1.jpg'

export default function Home() {
  return (
    <div className=''>
      <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${HomePageBackground})` }}>
        <Navbar />
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-white text-4xl font-bold'>Welcome to SMS</h1>
          <p className='text-white text-2xl'>The best way to manage your SMS</p>
        </div>
      </div>
    </div>
  )
}
