import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Mail, Users } from "lucide-react";
import { useTeachers } from "@/hooks/useTeachers";

const Teachers: React.FC = () => {
  // const teachers = [
  //   {
  //     id: 1,
  //     name: "Ms. Anjali Mehta",
  //     email: "anjali.mehta@gmail.com",
  //     subject: "Mathematics",
  //     classes: 3,
  //     students: 75,
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Mr. Rakesh Verma",
  //     email: "rakesh.verma@outlook.com",
  //     subject: "Physics",
  //     classes: 2,
  //     students: 45,
  //     status: "Active",
  //   },
  //   {
  //     id: 3,
  //     name: "Ms. Priya Sharma",
  //     email: "priya.sharma@gmail.com",
  //     subject: "English Literature",
  //     classes: 4,
  //     students: 120,
  //     status: "Active",
  //   },
  //   {
  //     id: 4,
  //     name: "Mr. Arvind Kumar",
  //     email: "arvind.kumar@outlook.com",
  //     subject: "Chemistry",
  //     classes: 3,
  //     students: 60,
  //     status: "Active",
  //   },
  //   {
  //     id: 5,
  //     name: "Ms. Neha Joshi",
  //     email: "neha.joshi@gmail.com",
  //     subject: "Biology",
  //     classes: 2,
  //     students: 50,
  //     status: "Active",
  //   },
  // ];

  const subjects = [
    "all",
    "Mathematics",
    "Physics",
    "English Literature",
    "Chemistry",
    "Biology",
    "History",
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = teacher.name.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      teacher.teacherEmailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      filterSubject === "all" || teacher.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Teachers</h2>
          <p className="text-gray-600 mt-2">Manage your teaching staff</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Teacher</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                {/* <TableHead>Subject</TableHead> */}
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {teacher.email}
                      </div>
                    </div>
                  </TableCell>
                  {/* <TableCell>{teacher.subject}</TableCell> */}
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 truncate max-w-xs">
                      {teacher.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {teacher.status !== null ? teacher.status : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Teachers;
