import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Dashborad/Sidebar';
import '../Css/customStyle.css'
import { NavLink, useNavigate } from 'react-router-dom';

const Teachers = () => {

  const [teachers, setTeachers] = useState([]);
  const [finalTeachers, setfinalTeachers] = useState([]);

  const navigate = useNavigate();

  const [filterTeachers, setFilterTeachers] = useState([])

  const isFilterTeachers = false


  useEffect(() => {

    const getTeachers = async () => {
      try {
        const response = await axios.get('https://localhost:44313/api/Teacher')
        // console.log(response);
        if (response.status === 200) {
          setTeachers(response.data.content);
          setfinalTeachers(response.data.content);
          setFilterTeachers(response.data.content);
          // console.log(response.data.content);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    getTeachers();

  }, [])

  const handleDelete = async (teacherId) => {

    const response = await axios.delete(`https://localhost:44313/api/Teacher/${teacherId}`)
    if (response.status === 200) {
      window.location.reload();
    }
    else {
      alert('Failed to delete teacher');
    }
  }

  const teacherFilter = (e) => {

    if (e != null) {
      const filtered = teachers.filter((x) =>
        x.teacherName.toLowerCase().includes(e.toLowerCase())
      );
      setFilterTeachers(filtered)
    }
    else {
      setFilterTeachers(finalTeachers);
    }
  }


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Teachers Management</h1>
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <input type="text" onChange={(e) => teacherFilter(e.target.value)} placeholder="Search teachers..." className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              <NavLink to="/addNewTeacher">
                Add New Teacher
              </NavLink>
            </button>
          </div><div className="w-full flex-1 p-8 relative">
            <div className="horizontalScrollBar">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR.NO</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Id</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">


                  {filterTeachers?.map((teacher, index) => (
                    <tr key={teacher?.teacherId}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{teacher?.teacherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{teacher?.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{teacher?.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{teacher?.teacherEmail}</td>
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
      </div>
    </div>
  );
};

export default Teachers;


