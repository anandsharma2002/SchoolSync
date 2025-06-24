import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function UpdateTeacher() {
    const [teacher, setTeacher] = useState({
        teacherName: '',
        teacherEmail: '',
        phoneNumber: '',
        subject: '',
    });

    const handleChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const location = useLocation();
    const teacherId = location.state;
    // console.log(teacherId);

    useEffect(() => {
        const getTeacher = async () => {
            const response = await axios.get(`https://localhost:44313/api/Teacher/${teacherId}`);
            setTeacher(response.data.content);
            // console.log(response.data.content);
        }
        getTeacher();
    }, []);







    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Only send the required model data
            const model = {
                teacherName: teacher.teacherName,
                teacherEmail: teacher.teacherEmail,
                phoneNumber: teacher.phoneNumber,
                subject: teacher.subject
            };
            const response = await axios.put(`https://localhost:44313/api/Teacher/${teacherId}`, model);
            if (response.status === 200 || response.status === 201) {
                console.log(response.data.content);
                alert('Teacher added successfully!');
                // window.location.reload();
            } else {
                alert('Failed to add teacher.');
            }
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Update Teacher</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="teacherName">Teacher Name</label>
                    <input type="text" id="teacherName" name="teacherName" value={teacher.teacherName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="teacherEmail">Teacher Email</label>
                    <input type="email" id="teacherEmail" name="teacherEmail" value={teacher.teacherEmail} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={teacher.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" value={teacher.subject} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">Update Teacher</button>
            </form>
        </div>
    );
}


