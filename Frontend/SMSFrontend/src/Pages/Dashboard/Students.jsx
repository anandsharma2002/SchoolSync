import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Dashborad/Sidebar';
import { useLocation } from 'react-router-dom';

import '../Css/customStyle.css'

import axios from 'axios';

const Students = () => {

  const location = useLocation();
  const { classId } = location.state;
  // console.log(classId)

  const [students, setStudents] = useState([])

  useEffect(()=> {

    const getStudents = async () => {
      const response = await axios.get(`https://localhost:44313/api/Student/GetStudentByClassIdAsync/${classId}`)
      if(response.data.statusCode == 200)
        setStudents(response.data.content)
    }
    getStudents()
  }, [])
  
  console.log(students)

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex-1 p-8 relative">
      <div className=" horizontalScrollBar">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">SR.NO</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Last Name</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Date of Birth</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Father's Name</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Mother's Name</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Email Id</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Edit</th>
                  <th className="px-6 py-3 text-left text-xs font-weight:800 uppercase tracking-wider">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">


                {students?.map((teacher, index) => (
                  <tr key={teacher?.studentId}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{teacher?.firstName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{teacher?.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{teacher?.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{teacher?.dob}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{teacher?.fatherName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{teacher?.motherName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{teacher?.parentPhoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{teacher?.parentEmailId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => navigate('/updateTeacher', { state: teacher?.teacherId })}>
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => { if (window.confirm('Are you sure you want to delete this teacher?')) { handleDelete(teacher?.teacherId); } }} className="cursor-pointer bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-lg">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default Students; 