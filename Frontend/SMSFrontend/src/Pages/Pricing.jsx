import React from 'react'
import Footer from '../Components/Footer'

export default function Pricing() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='w-[98%] mx-auto px-4 py-8 flex-grow'>
        <h1 className='text-4xl font-bold mb-6'>Pricing Plans</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white bg-opacity-30 p-6 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>Basic Plan</h2>
            <p className='text-3xl font-bold mb-4'>$99/month</p>
            <ul className='space-y-2'>
              <li>Up to 100 students</li>
              <li>Basic features</li>
              <li>Email support</li>
            </ul>
          </div>
          <div className='bg-white bg-opacity-30 p-6 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>Pro Plan</h2>
            <p className='text-3xl font-bold mb-4'>$199/month</p>
            <ul className='space-y-2'>
              <li>Up to 500 students</li>
              <li>Advanced features</li>
              <li>Priority support</li>
            </ul>
          </div>
          <div className='bg-white bg-opacity-30 p-6 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>Enterprise Plan</h2>
            <p className='text-3xl font-bold mb-4'>Custom</p>
            <ul className='space-y-2'>
              <li>Unlimited students</li>
              <li>All features</li>
              <li>24/7 dedicated support</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 