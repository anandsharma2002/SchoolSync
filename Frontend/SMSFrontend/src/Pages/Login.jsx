import React, { useState } from 'react'
import Footer from '../Components/Footer'
import LoginPageBackground from '../assets/Photos/LoginPageBackground.jpg'
import { NavLink } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='w-full mx-auto flex-grow mb-1'>
        <div className='bg-cover bg-center min-h-screen' style={{ backgroundImage: `url(${LoginPageBackground})` }}>
          <div className='container mx-auto px-4 py-4 sm:py-8 flex-grow flex items-center justify-center'>
            <div className='w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-4xl'>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center text-white bg-black bg-opacity-20 px-4 py-2 rounded-lg'>Welcome</h1>
              <div className='bg-white bg-opacity-30 p-3 sm:p-4 md:p-6 rounded-lg backdrop-blur-sm'>
                <div className='relative'>
                  <div
                    className={`absolute top-0 h-full rounded-lg z-10 transition-all duration-500 ease-in-out bg-gradient-to-r from-[#2a9b93] to-[#5f95c7] ${isLogin ? 'left-0 w-[50%]' : 'left-[50%] w-[50%]'
                      }`}
                  ></div>
                  <div className='flex flex-col lg:flex-row'>
                    {/* Login Section */}
                    <div className='flex-1 p-4 sm:p-5 md:p-6 bg-white bg-opacity-90 rounded-l-lg'>
                      <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800'>Login</h2>
                      <form className='space-y-3 sm:space-y-4'>
                        <div>
                          <label className='block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-gray-700'>Email</label>
                          <input
                            type="email"
                            className='w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Enter your email'
                          />
                        </div>
                        <div>
                          <label className='block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-gray-700'>Password</label>
                          <input
                            type="password"
                            className='w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Enter your password'
                          />
                        </div>
                        <button
                          type="submit"
                          className='w-full bg-blue-500 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]'
                        >
                          Login
                        </button>
                        <button
                          type="button"
                          onClick={handleToggle}
                          className='w-full mt-2 text-blue-500 hover:text-blue-600 transition-colors duration-300'
                        >
                          Don't have an account? Sign Up
                        </button>
                      </form>
                    </div>

                    {/* Sign Up Section */}
                    <div className='flex-1 p-4 sm:p-5 md:p-6 bg-white bg-opacity-90 rounded-r-lg'>
                      <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800'>Sign Up</h2>
                      <form className='space-y-3 sm:space-y-4'>
                        <div>
                          <label className='block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-gray-700'>Full Name</label>
                          <input
                            type="text"
                            className='w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Enter your full name'
                          />
                        </div>
                        <div>
                          <label className='block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-gray-700'>Email</label>
                          <input
                            type="email"
                            className='w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Enter your email'
                          />
                        </div>
                        <div>
                          <label className='block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-gray-700'>Password</label>
                          <input
                            type="password"
                            className='w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Create a password'
                          />
                        </div>
                        <div>
                          <label className='block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-gray-700'>Confirm Password</label>
                          <input
                            type="password"
                            className='w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Confirm your password'
                          />
                        </div>
                        <button
                          type="submit"
                          className='w-full bg-green-500 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]'
                        >
                          Sign Up
                        </button>
                        <button type="button" onClick={handleToggle} className='w-full mt-2 text-green-500 hover:text-green-600 transition-colors duration-300'>
                          Already have an account? Login
                        </button>

                        <div>
                          <button className='border-2 rounded-lg p-2 bg-[#169] font-bold text-white'>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 