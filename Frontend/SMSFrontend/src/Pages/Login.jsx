import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import HomePageBackground from '../assets/Photos/HomePageBackground1.jpg'

export default function Login() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${HomePageBackground})` }}>
        <Navbar />
        <div className='container mx-auto px-4 py-8 flex-grow flex items-center justify-center'>
          <div className='max-w-md w-full'>
            <h1 className='text-4xl font-bold mb-6 text-center text-white bg-black bg-opacity-20 px-4 py-2 rounded-lg'>Login / Sign Up</h1>
            <div className='bg-white bg-opacity-30 p-6 rounded-lg backdrop-blur-sm'>
              <form className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-2 text-white'>Email</label>
                  <input
                    type="email"
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90'
                    placeholder='Enter your email'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2 text-white'>Password</label>
                  <input
                    type="password"
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90'
                    placeholder='Enter your password'
                  />
                </div>
                <button
                  type="submit"
                  className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300'
                >
                  Login
                </button>
                <p className='text-center mt-4 text-white'>
                  Don't have an account?{' '}
                  <a href="#" className='text-blue-300 hover:text-blue-400 transition-colors duration-300'>
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 