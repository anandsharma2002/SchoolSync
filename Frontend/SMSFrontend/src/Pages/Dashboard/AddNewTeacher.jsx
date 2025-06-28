import React, { useState } from 'react';
import axios from 'axios';
import { div } from 'framer-motion/client';
import { NavLink } from 'react-router-dom';

export default function AddNewTeacher() {
    const [form, setForm] = useState({
        teacherName: '',
        teacherEmail: '',
        phoneNumber: '',
        subject: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Only send the required model data
            const model = {
                teacherName: form.teacherName,
                teacherEmail: form.teacherEmail,
                phoneNumber: form.phoneNumber,
                subject: form.subject
            };
            const response = await axios.post('https://localhost:44313/api/Teacher', model);
            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
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
        <div>
            <div className="items-center justify-center min-h-screen  p-4">
                <NavLink to="/teachers" className="bg-blue-800 px-4 py-2 text-white rounded font-bold text-[18px]">Back</NavLink>
                <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-6 text-center">Add New Teacher</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="teacherName">Teacher Name</label>
                            <input type="text" id="teacherName" name="teacherName" value={form.teacherName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="teacherEmail">Teacher Email</label>
                            <input type="email" id="teacherEmail" name="teacherEmail" value={form.teacherEmail} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">Add Teacher</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


