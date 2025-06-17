import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const menuItems = [
  { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
  { path: "/students", name: "Students", icon: <FaUserGraduate /> },
  { path: "/teachers", name: "Teachers", icon: <FaChalkboardTeacher /> },
  { path: "/courses", name: "Courses", icon: <FaBook /> },
  { path: "/schedule", name: "Schedule", icon: <FaCalendarAlt /> },
  { path: "/reports", name: "Reports", icon: <FaChartBar /> },
  { path: "/settings", name: "Settings", icon: <FaCog /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-[#2a9b93] to-[#5f95c7] text-white lg:hidden"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Overlay */}
        {isMobile && isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{
            width: isOpen ? (isMobile ? "100%" : "280px") : "0px",
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 overflow-hidden ${isMobile ? "w-full" : "w-[280px]"
            }`}
        >
          {/* Logo Section */}
          <div className="mt-[65px] h-20 flex items-center justify-center bg-gradient-to-r from-[#2a9b93] to-[#5f95c7]">
            <h1 className="text-2xl font-bold text-white">School MS</h1>
          </div>

          {/* Navigation Links */}
          <div className="py-4">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${isActive ? "bg-gradient-to-r from-[#2a9b93] to-[#5f95c7] text-white" : ""
                  }`
                }
              >
                <span className="text-xl mr-4">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-0 w-full p-4">
            <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-lg">
              <FaSignOutAlt className="text-xl mr-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content Wrapper */}
        <div
          className={`transition-all duration-300 ${isOpen && !isMobile ? "ml-[280px]" : "ml-0"
            }`}
        >
          {/* Your main content goes here */}
        </div>
      </div>

    </>
  );
};

export default Sidebar; 