import React from 'react';
import Sidebar from '../../Components/Dashborad/Sidebar';
import { NavLink } from 'react-router-dom';
import ClassCard from '../../Components/Dashborad/ClassCard';
import ClassCardImage from '../../assets/Photos/ClassCardImage.jpg';

const Students = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          <ClassCard image={ClassCardImage} name="Class 1" buttonText="View Class" onButtonClick={() => {}} />
          <ClassCard image={ClassCardImage} name="Class 2" buttonText="View Class" onButtonClick={() => {}} />
          <ClassCard image={ClassCardImage} name="Class 3" buttonText="View Class" onButtonClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Students; 