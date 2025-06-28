import React from 'react';
import Sidebar from '../../Components/Dashborad/Sidebar';
import { NavLink, useLocation } from 'react-router-dom';
import ClassCard from './ClassCard';
import ClassCardImage from '../../assets/Photos/ClassCardImage.jpg';

const Students = () => {

  const location = useLocation();
  const { classId } = location.state;
  console.log(classId)


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        Students
      </div>
    </div>
  );
};

export default Students; 