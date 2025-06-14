import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/Photos/logo.png'
import SchoolLogo from '../assets/Photos/SchoolLogo.png'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-transparent w-full relative sticky top-0 z-50">
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-[98%] h-[100%] bg-white opacity-40 z-0 rounded-lg'></div>
            <div className='w-[98%] mx-auto z-20 border-b border-white border-opacity-90 rounded-lg relative'>
                <div className="mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex justify-between items-center w-full">
                        <NavLink to="/" className="flex items-center text-xl font-bold">
                            {/* <img src={SchoolLogo} alt="Logo" className=" h-10 mr-2" /> */}
                            <motion.img 
                                src={logo} 
                                alt="Logo" 
                                className="h-10 mr-2"
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className='text-[28px] text-black'>AV SMS</div>
                        </NavLink>
                        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            <span className="block w-6 h-0.5 bg-black mb-1"></span>
                            <span className="block w-6 h-0.5 bg-black mb-1"></span>
                            <span className="block w-6 h-0.5 bg-black"></span>
                        </button>
                    </div>
                    <div className={`flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-12 mr-4 text-left w-full md:w-auto ${isOpen ? 'block' : 'hidden'} md:block`}>
                        <NavLink to="/about" className="text-black hover:text-gray-600 text-[20px]">About</NavLink>
                        <NavLink to="/pricing" className="text-black hover:text-gray-600 text-[20px]">Pricing</NavLink>
                        <NavLink to="/schools" className="text-black hover:text-gray-600 text-[20px]">Schools</NavLink>
                        <NavLink to="/login" className="text-black hover:text-gray-600 text-[20px]">LogIn/SignUp</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}
