import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/Photos/logo.png'
import SchoolLogo from '../assets/Photos/SchoolLogo.png'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-transparent w-full relative sticky top-0 z-50">
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-[98%] h-[100%] bg-white opacity-50 z-0 rounded-lg'></div>
            <div className='w-[98%] mx-auto z-20 border-b border-white border-opacity-90 rounded-lg relative'>
                <div className="mx-auto px-4 py-3 flex flex-col md:flex-row justify-end items-center">
                    <div className="flex justify-between items-center">
                        <NavLink to="/" className="flex items-center text-xl font-bold">
                            {/* <img src={SchoolLogo} alt="Logo" className=" h-10 mr-2" /> */}
                            <motion.img src={logo} alt="Logo" className="h-10 ml-5 mr-2" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}/>
                            {/* <div className='text-[28px] text-black'>AV Managements</div> */}
                        </NavLink>
                        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            <span className="block w-6 h-0.5 bg-black mb-1"></span>
                            <span className="block w-6 h-0.5 bg-black mb-1"></span>
                            <span className="block w-6 h-0.5 bg-black"></span>
                        </button>
                    </div>
                    <div className={`absolute top-full left-0 w-4/6 bg-white bg-opacity-40 shadow-lg md:shadow-none md:bg-transparent md:relative md:top-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-12 md:ml-auto text-left rounded-lg ${isOpen ? 'block' : 'hidden'} md:block`}>
                        <NavLink to="/" className="text-black hover:text-gray-600 text-[20px] px-4 md:py-0">Home</NavLink>
                        <NavLink to="/about" className="text-black hover:text-gray-600 text-[20px]  py-2 md:py-0">About Us</NavLink>
                        <NavLink to="/pricing" className="text-black hover:text-gray-600 text-[20px] py-2 md:py-0">Pricing</NavLink>
                        <NavLink to="/schools" className="text-black hover:text-gray-600 text-[20px] py-2 md:py-0">Schools</NavLink>
                        <NavLink to="/login" className="px-2 pb-4 md:py-0">
                            <span className='text-white  text-[20px]   bg-gradient-to-r from-[#2A8AA2] to-[#4f95c7] rounded-lg px-6 py-2 hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg md:ml-4'>LogIn/SignUp</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}
