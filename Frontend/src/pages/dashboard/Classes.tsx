import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Book, UserCheck } from "lucide-react";


const Classes: React.FC = () => {
  const classes = [
    {
      id: 1,
      name: "Class 11-A",
      teacher: "Ms. Sweta",
      totalTeacher: 4,
      students: 25,
      room: "Room A-101",
      time: "9:00 AM - 10:30 AM",
      attendance: "22/25",
    },
    {
      id: 2,
      name: "Class 11-B",
      teacher: "Mr. Neeraj",
      totalTeacher: 4,
      students: 18,
      room: "Room B-203",
      time: "11:00 AM - 12:30 PM",
      attendance: "16/18",
    },
    {
      id: 3,
      name: "Class 11-C",
      teacher: "Ms. Ragini",
      totalTeacher: 4,
      students: 30,
      room: "Room C-105",
      time: "2:00 PM - 3:30 PM",
      attendance: "28/30",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Classes
          </h2>
          <p className="text-gray-600 mt-2">
            Manage all your classes and schedules
          </p>
        </div>
        <Button className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>Add New Class</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {classes.map((classItem) => (
          <Card
            key={classItem.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="h-5 w-5 text-primary-600" />
                <span className="text-sm sm:text-base">{classItem.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Class Teacher:</span>
                <span className="text-sm font-medium">{classItem.teacher}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Students:</span>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {classItem.students}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Assigned Teachers:
                </span>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {classItem.totalTeacher}
                  </span>
                </div>
              </div>
              {/* <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Room:</span>
                <span className="text-sm font-medium">{classItem.room}</span>
              </div> */}
              {/* <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time:</span>
                <span className="text-sm font-medium">{classItem.time}</span>
              </div> */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Attendance:</span>
                <div className="flex items-center space-x-1">
                  <UserCheck className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">
                    {classItem.attendance}
                  </span>
                </div>
              </div>
              <div className="pt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Classes;
