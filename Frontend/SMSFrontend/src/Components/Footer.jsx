import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/Photos/logo.png'
import FooterBackgroundImage from '../assets/Photos/FooterBackgroundImage.jpg'

export default function Footer() {
  return (
    <footer className="relative text-white">
      <div className="absolute inset-0 bg-[#111] opacity-90"></div>
      <div className="absolute inset-0 bg-cover  bg-center" style={{ backgroundImage: `url(${FooterBackgroundImage})` }}></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AV SMS</h3>
            <p className="text-sm">
              The best platform for school management. Streamlining education administration for a better future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/about" className="hover:text-gray-300">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/pricing" className="hover:text-gray-300">Pricing</NavLink>
              </li>
              <li>
                <NavLink to="/schools" className="hover:text-gray-300">Schools</NavLink>
              </li>
              <li>
                <NavLink to="/login" className="hover:text-gray-300">Login/SignUp</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: AnandSharma.ts3000@gmail.com</li>
              <li>Phone: +91 7014791230</li>
              <li>Address: Mansarovar, Jaipur, Rajasthan</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} AV SMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 