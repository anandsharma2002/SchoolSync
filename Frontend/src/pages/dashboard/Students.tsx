import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useStudent } from "@/hooks/useStudents";
import { useClasses } from "@/hooks/useClasses";
import StudentsSkeleton from "@/skeletons/StudentsSkeleton";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  rollNumber: string;
  parentName: string;
  parentPhone: string;
  address: string;
  admissionDate: string;
  status: "Active" | "Inactive" | "Graduated";
}

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterClass, setFilterClass] = useState("all");
  const studentsPerPage = 10;

  // Sample student data
  // const [students] = useState<Student[]>([
  //   {
  //     id: "1",
  //     name: "Aryan Sharma",
  //     email: "aryan.sharma@gmail.com",
  //     phone: "+91 9876543210",
  //     class: "Class 10A",
  //     rollNumber: "STU001",
  //     parentName: "Ravi Sharma",
  //     parentPhone: "+91 9876543211",
  //     address: "12 MG Road, Jaipur, Rajasthan",
  //     admissionDate: "2023-04-15",
  //     status: "Active",
  //   },
  //   {
  //     id: "2",
  //     name: "Ishita Verma",
  //     email: "ishita.verma@outlook.com",
  //     phone: "+91 9876543212",
  //     class: "Class 10B",
  //     rollNumber: "STU002",
  //     parentName: "Amit Verma",
  //     parentPhone: "+91 9876543213",
  //     address: "221 Civil Lines, Lucknow, Uttar Pradesh",
  //     admissionDate: "2023-04-20",
  //     status: "Active",
  //   },
  //   {
  //     id: "3",
  //     name: "Krishna Nair",
  //     email: "krishna.nair@gmail.com",
  //     phone: "+91 9876543214",
  //     class: "Class 9A",
  //     rollNumber: "STU003",
  //     parentName: "Suresh Nair",
  //     parentPhone: "+91 9876543215",
  //     address: "33 MG Street, Kochi, Kerala",
  //     admissionDate: "2023-03-10",
  //     status: "Active",
  //   },
  //   {
  //     id: "4",
  //     name: "Simran Kaur",
  //     email: "simran.kaur@outlook.com",
  //     phone: "+91 9876543216",
  //     class: "Class 11A",
  //     rollNumber: "STU004",
  //     parentName: "Harpreet Singh",
  //     parentPhone: "+91 9876543217",
  //     address: "55 Sector 17, Chandigarh",
  //     admissionDate: "2022-04-05",
  //     status: "Active",
  //   },
  //   {
  //     id: "5",
  //     name: "Rohan Mehta",
  //     email: "rohan.mehta@gmail.com",
  //     phone: "+91 9876543218",
  //     class: "Class 12A",
  //     rollNumber: "STU005",
  //     parentName: "Manish Mehta",
  //     parentPhone: "+91 9876543219",
  //     address: "78 Nehru Place, Delhi",
  //     admissionDate: "2021-04-01",
  //     status: "Graduated",
  //   },
  //   {
  //     id: "6",
  //     name: "Tanvi Deshmukh",
  //     email: "tanvi.deshmukh@outlook.com",
  //     phone: "+91 9876543220",
  //     class: "Class 9B",
  //     rollNumber: "STU006",
  //     parentName: "Rajesh Deshmukh",
  //     parentPhone: "+91 9876543221",
  //     address: "101 FC Road, Pune, Maharashtra",
  //     admissionDate: "2023-05-12",
  //     status: "Active",
  //   },
  // ]);

  // const classes = [
  //   "all",
  //   "Class 9A",
  //   "Class 9B",
  //   "Class 10A",
  //   "Class 10B",
  //   "Class 11A",
  //   "Class 12A",
  // ];

  const studentQuery = useStudent();
  const classQuery = useClasses();

  if (studentQuery.isLoading || classQuery.isLoading)
    return <StudentsSkeleton />;
  if (studentQuery.isError || classQuery.isError)
    return (
      <h1>
        "Error:"{studentQuery.isError},{classQuery.isError}
      </h1>
    );

  const students = studentQuery.data;
  const classes = classQuery.data;

  // Filter students based on search term and class filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentMailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Graduated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">
            Manage all student information and records
          </p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.length}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-green-600">
                  {students.filter((s) => s.status === "Active").length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Graduated</p>
                <p className="text-2xl font-bold text-blue-600">
                  {students.filter((s) => s.status === "Graduated").length}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Year</p>
                <p className="text-2xl font-bold text-purple-600">3</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Plus className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <option key={cls.classId} value={cls.className}>
                    {cls.className === "all" ? "All Classes" : cls.className}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {student.firstName + " " + student.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.studentMailId !== null
                            ? student.studentMailId
                            : student.parentEmailId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {student.rollNumber}
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-3 w-3 mr-1" />
                          {student.phoneNumber !== null
                            ? student.phoneNumber
                            : student.parentPhoneNumber}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {student.studentMailId !== null
                            ? student.studentMailId
                            : student.parentEmailId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">
                          {student.fatherName !== null
                            ? student.fatherName
                            : student.motherName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.parentPhoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}
                      >
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;
