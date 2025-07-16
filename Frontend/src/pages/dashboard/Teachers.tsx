import React, { useState } from "react";
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
import {
  Plus,
  Mail,
  Users,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useTeachers } from "@/hooks/useTeachers";
import TeachersSkeleton from "@/skeletons/TeachersSkeleton";

interface Teacher {
  teacherId: string;
  teacherName: string;
  teacherEmailId: string;
  teacherMailId?: string;
  phoneNumber: string;
  subject: string;
  address: string;
  schoolId: string;
  status: "Active" | "Inactive";
}

const Teachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");

  const { data: teachers, isLoading, isError, error } = useTeachers();

  if (isLoading) return <TeachersSkeleton />;
  if (isError) return <h1>"Error: "{error.message}</h1>;

  // const teachers: Teacher[teachers] = [
  //   {
  //     teacherId: "1",
  //     teacherName: "Dr. Sarah Smith",
  //     teacherEmailId: "sarah.smith@school.edu",
  //     teacherMailId: "sarah.smith@school.edu",
  //     phoneNumber: "+1 234 567 8901",
  //     subject: "Mathematics",
  //     address: "123 Oak Street, City, State",
  //     schoolId: "school-1",
  //     status: "Present",
  //   },
  //   {
  //     teacherId: "2",
  //     teacherName: "Prof. John Johnson",
  //     teacherEmailId: "john.johnson@school.edu",
  //     teacherMailId: "john.johnson@school.edu",
  //     phoneNumber: "+1 234 567 8902",
  //     subject: "Physics",
  //     address: "456 Pine Avenue, City, State",
  //     schoolId: "school-1",
  //     status: "Present",
  //   },
  //   {
  //     teacherId: "3",
  //     teacherName: "Ms. Emily Davis",
  //     teacherEmailId: "emily.davis@school.edu",
  //     teacherMailId: "emily.davis@school.edu",
  //     phoneNumber: "+1 234 567 8903",
  //     subject: "English Literature",
  //     address: "789 Maple Road, City, State",
  //     schoolId: "school-1",
  //     status: "Absent",
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
    const fullName = teacher.teacherName.toLowerCase();
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
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search teachers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.teacherId}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{teacher.teacherName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {teacher.teacherEmailId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.phoneNumber}</TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 truncate max-w-xs">
                      {teacher.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  ${teacher.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} `}
                    >
                      {teacher.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
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
