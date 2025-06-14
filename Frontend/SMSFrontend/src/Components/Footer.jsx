import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="container mx-auto px-4 py-8">
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
              <li>Email: info@avsms.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Education St, Learning City</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-twitter"></i> Twitter
              </a>
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