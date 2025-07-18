import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Eye,
  Trash2,
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

import { useStudents } from "@/hooks/useStudents";
import { useClasses } from "@/hooks/useClasses";

import StudentsSkeleton from "@/skeletons/StudentsSkeleton";
import AddStudentPopup from "@/popups/students/AddStudentPopup";
import EditStudentPopup from "@/popups/students/EditStudentPopup";
import ViewStudentPopup from "@/popups/students/ViewStudentPopup";
import DeleteStudentPopup from "@/popups/students/DeleteStudentPopup";

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterClass, setFilterClass] = useState("all");

  const {
    data: students = [],
    isLoading,
    isError,
    error,
    addStudent,
    editStudent,
    deleteStudent,
  } = useStudents();

  const { data: classes = [] } = useClasses();

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [modal, setModal] = useState<"add" | "edit" | "view" | "delete" | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (
    type: "add" | "edit" | "view" | "delete",
    student?: any
  ) => {
    setModal(type);
    setSelectedStudent(student || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModal(null);
    setSelectedStudent(null);
    setIsOpen(false);
  };

  const handleAdd = async (newStudent: any) => {
    await addStudent({ newStudent });
    closeModal();
  };

  const handleEdit = async (updatedStudent: any) => {
    if (!selectedStudent) return;
    await editStudent({ updatedStudent: { ...selectedStudent, ...updatedStudent } });
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteStudent({ id });
    closeModal();
  };

  // Filter & Pagination logic...
  const filteredStudents = students.filter((s: any) => {
    const matchesSearch =
      s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || s.class?.name === filterClass;
    return matchesSearch && matchesClass;
  });

  const studentsPerPage = 10;
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Absent": return "bg-red-100 text-red-800";
      case "Leave": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const staticAttendance = [
    { studentId: students?.[0]?.id, status: "Absent", date: "2025-07-17" },
    { studentId: 2, status: "Absent", date: "2025-07-18" },
    { studentId: 3, status: "Late", date: "2025-07-18" },
  ];

  if (isLoading) return <StudentsSkeleton />;
  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

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
        <Button onClick={() => openModal("add")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader><CardTitle>Student List</CardTitle></CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterClass}
                onChange={(e) => { setFilterClass(e.target.value); setCurrentPage(1); }}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">All Classes</option>
                {classes.map((cls: any) => (
                  <option key={cls.id} value={cls.name}>
                    {cls.name} {cls.section}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Records */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.No.</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student: any, idx: number) => {
                  const attendance = staticAttendance.find(a => a.studentId === student.id);
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{startIndex + idx + 1}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                          <div className="text-sm text-gray-500">{student.email || "N/A"}</div>
                        </div>
                      </TableCell>
                      <TableCell>{student?.class ? `${student.class.name} ${student.class.section}` : "N/A"}</TableCell>
                      <TableCell>{student.dob ? new Date(student.dob).toLocaleDateString("en-GB") : "N/A"}</TableCell>
                      <TableCell>{student.gender || "N/A"}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${attendance ? getStatusColor(attendance.status) : "bg-gray-100 text-gray-800"}`}>
                          {attendance ? attendance.status : "Unknown"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openModal("view", student)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const fullStudent = {
                                ...student,
                                class: classes.find((c: any) => c.id === student.class.id),
                              };
                              openModal("edit", fullStudent);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openModal("delete", student)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage(current => Math.max(1, current - 1))} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext onClick={() => setCurrentPage(current => Math.min(totalPages, current + 1))} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {modal === "add" && <AddStudentPopup isOpen={isOpen} onClose={closeModal} onSubmit={handleAdd} />}
      {modal === "edit" && selectedStudent && (
        <EditStudentPopup isOpen={isOpen} studentData={selectedStudent} onClose={closeModal} onSubmit={handleEdit} />
      )}
      {modal === "view" && selectedStudent && (
        <ViewStudentPopup isOpen={isOpen} studentData={selectedStudent} onClose={closeModal} />
      )}
      {modal === "delete" && selectedStudent && (
        <DeleteStudentPopup isOpen={isOpen} studentData={selectedStudent} onClose={closeModal} onConfirm={() => handleDelete(selectedStudent.id)} />
      )}
    </div>
  );
};

export default Students;
