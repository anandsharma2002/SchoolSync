import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import HomePageBackground from '../assets/Photos/HomePagebackground1.jpg'
import HomePageCard1 from '../assets/Photos/HomePageCard1.jpg'
import HomePageCard2 from '../assets/Photos/HomePageCard2.jpg'
import HomePageCard3 from '../assets/Photos/HomePageCard3.jpg'
import HomePageCard4 from '../assets/Photos/HomePageCard4.jpg'
import HomePageCard5 from '../assets/Photos/HomePageCard5.jpg'
import HomePageCard6 from '../assets/Photos/HomePageCard6.jpg'

import { motion, useInView } from 'framer-motion'

export default function Home() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const ref5 = useRef(null)
  const ref6 = useRef(null)

  const isInView1 = useInView(ref1, { once: true, amount: 0.3 })
  const isInView2 = useInView(ref2, { once: true, amount: 0.3 })
  const isInView3 = useInView(ref3, { once: true, amount: 0.3 })
  const isInView4 = useInView(ref4, { once: true, amount: 0.3 })
  const isInView5 = useInView(ref5, { once: true, amount: 0.3 })
  const isInView6 = useInView(ref6, { once: true, amount: 0.3 })

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='w-[98%] mx-auto px-4 py-8 flex-grow'>
        <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${HomePageBackground})` }}>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-white text-4xl text-[40px] font-bold bg-black bg-opacity-40 px-4 py-2 rounded-lg mt-[-100px]'>Welcome to AV School Management System</h1>
            <p className='text-black text-[25px] font-bold bg-white bg-opacity-40 px-4 py-2 rounded-lg rounded-[8px] mt-4'>The best platform for the management.</p>
          </div>
        </div>

        {/* Information Cards Section */}
        <div className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>Why Choose Our School Management System?</h2>

            {/* Card 1 */}
            <div ref={ref1}>
              <motion.div
                className='bg-white rounded-lg shadow-lg overflow-hidden mb-8'
                initial={{ opacity: 0, y: 100 }}
                animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className='flex flex-col md:flex-row justify-center items-center'>
                  <div className='md:w-1/2 p-8'>
                    <h3 className='text-2xl font-bold mb-4 text-blue-600'>Student Management</h3>
                    <p className='text-gray-600'>
                      Efficiently manage student records, attendance, and academic progress with our comprehensive student management tools. Track student performance, manage enrollments, and maintain detailed academic records all in one place.
                    </p>
                  </div>
                  <div className='md:w-1/2 bg-blue-100 flex items-center justify-center'>
                    <img src={HomePageCard1} alt="Student Management" className='' />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 2 */}
            <div ref={ref2}>
              <motion.div
                className='bg-white rounded-lg shadow-lg overflow-hidden mb-8'
                initial={{ opacity: 0, y: 100 }}
                animate={isInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className='flex flex-col md:flex-row-reverse justify-center items-center'>
                  <div className='md:w-1/2 p-8'>
                    <h3 className='text-2xl font-bold mb-4 text-blue-600'>Teacher Portal</h3>
                    <p className='text-gray-600'>
                      Empower teachers with tools for lesson planning, grade management, and effective communication with students and parents. Create and manage assignments, track student progress, and maintain detailed class records.
                    </p>
                  </div>
                  <div className='md:w-1/2 bg-blue-100 flex items-center justify-center'>
                    <img src={HomePageCard2} alt="Teacher Portal" className='' />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 3 */}
            <div ref={ref3}>
              <motion.div
                className='bg-white rounded-lg shadow-lg overflow-hidden mb-8'
                initial={{ opacity: 0, y: 100 }}
                animate={isInView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className='flex flex-col md:flex-row justify-center items-center'>
                  <div className='md:w-1/2 p-8'>
                    <h3 className='text-2xl font-bold mb-4 text-blue-600'>Performance Analytics</h3>
                    <p className='text-gray-600'>
                      Track and analyze student performance with detailed reports and insights to improve educational outcomes. Generate comprehensive reports, identify trends, and make data-driven decisions to enhance learning.
                    </p>
                  </div>
                  <div className='md:w-1/2 bg-blue-100 flex items-center justify-center'>
                    <img src={HomePageCard3} alt="Performance Analytics" className='' />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 4 */}
            <div ref={ref4}>
              <motion.div
                className='bg-white rounded-lg shadow-lg overflow-hidden mb-8'
                initial={{ opacity: 0, y: 100 }}
                animate={isInView4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className='flex flex-col md:flex-row-reverse justify-center items-center'>
                  <div className='md:w-1/2 p-8'>
                    <h3 className='text-2xl font-bold mb-4 text-blue-600'>Real-time Notifications</h3>
                    <p className='text-gray-600'>
                      Stay informed with instant updates about attendance, grades, and important school announcements. Receive timely notifications about important events, deadlines, and student progress.
                    </p>
                  </div>
                  <div className='md:w-1/2 bg-blue-100 flex items-center justify-center'>
                    <img src={HomePageCard4} alt="Real-time Notifications" className='' />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 5 */}
            <div ref={ref5}>
              <motion.div
                className='bg-white rounded-lg shadow-lg overflow-hidden mb-8'
                initial={{ opacity: 0, y: 100 }}
                animate={isInView5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className='flex flex-col md:flex-row justify-center items-center'>
                  <div className='md:w-1/2 p-8'>
                    <h3 className='text-2xl font-bold mb-4 text-blue-600'>Schedule Management</h3>
                    <p className='text-gray-600'>
                      Organize classes, events, and activities with our intuitive scheduling and calendar management system. Create and manage timetables, schedule events, and coordinate activities efficiently.
                    </p>
                  </div>
                  <div className='md:w-1/2 bg-blue-100 flex items-center justify-center'>
                    <img src={HomePageCard5} alt="Schedule Management" className='' />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 6 */}
            <div ref={ref6}>
              <motion.div
                className='bg-white rounded-lg shadow-lg overflow-hidden mb-8'
                initial={{ opacity: 0, y: 100 }}
                animate={isInView6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className='flex flex-col md:flex-row-reverse justify-center items-center'>
                  <div className='md:w-1/2 p-8'>
                    <h3 className='text-2xl font-bold mb-4 text-blue-600'>Secure Platform</h3>
                    <p className='text-gray-600'>
                      Ensure data security and privacy with our robust security measures and role-based access control. Protect sensitive information and maintain compliance with data protection regulations.
                    </p>
                  </div>
                  <div className='md:w-1/2 bg-blue-100 flex items-center justify-center'>
                    <img src={HomePageCard6} alt="Secure Platform" className='' />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
