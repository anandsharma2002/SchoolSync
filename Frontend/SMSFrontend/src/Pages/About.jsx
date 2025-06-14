import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function About() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='container mx-auto px-4 py-8 flex-grow'>
        <h1 className='text-4xl font-bold mb-6'>About Us</h1>
        <div className='bg-white bg-opacity-30 p-6 rounded-lg'>
          <p className='text-lg mb-4'>
            Welcome to our School Management System. We are dedicated to providing the best platform for educational institutions.
          </p>
          <p className='text-lg'>
            Our mission is to streamline school operations and enhance the learning experience for students, teachers, and administrators.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
} 