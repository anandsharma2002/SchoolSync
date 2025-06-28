import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Dashborad/Sidebar';
import ClassCard from './ClassCard';
import ClassCardImage from '../../assets/Photos/ClassCardImage.jpg';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Class = () => {

    const [classes, setClasses] = useState([])

    

    

    useEffect(() => {
        const getClasses = async () => {
            const response = await axios.get("https://localhost:44313/api/Class")
            // console.log(response.data)

            if (response.data.statusCode == 200) {
                setClasses(response.data.content)
            }
        }


        getClasses()
    }, [])

    // console.log(classes)

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR.NO</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white ">
                            {classes.map((item, index) => (
                                <ClassCard key={item.classId} item={item} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default Class; 