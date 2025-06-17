import React from 'react';
import Sidebar from '../../Components/Dashborad/Sidebar';

const Courses = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Courses Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Mathematics</h3>
            <p className="text-gray-600 mb-4">Advanced mathematics course for high school students</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">45 Students</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Physics</h3>
            <p className="text-gray-600 mb-4">Comprehensive physics course covering mechanics and thermodynamics</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">38 Students</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Computer Science</h3>
            <p className="text-gray-600 mb-4">Introduction to programming and computer fundamentals</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">52 Students</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        </div>

        <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
          Add New Course
        </button>
      </div>
    </div>
  );
};

export default Courses; 