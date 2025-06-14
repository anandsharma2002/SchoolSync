import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function Schools() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='container mx-auto px-4 py-8 flex-grow'>
        <h1 className='text-4xl font-bold mb-6'>Our Schools</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white bg-opacity-30 p-6 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>Public Schools</h2>
            <p className='mb-4'>Comprehensive management solutions for public educational institutions.</p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Learn More</button>
          </div>
          <div className='bg-white bg-opacity-30 p-6 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>Private Schools</h2>
            <p className='mb-4'>Tailored solutions for private educational institutions.</p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Learn More</button>
          </div>
          <div className='bg-white bg-opacity-30 p-6 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>International Schools</h2>
            <p className='mb-4'>Global solutions for international educational institutions.</p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Learn More</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 