import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Book, Eye, Pencil, Trash2, GraduationCap } from "lucide-react";
import { useClasses } from "@/hooks/useClasses";
import { useQueryClient } from "@tanstack/react-query";
import AddClassModal from "@/utility/classes/AddClassModal";
import EditClassModal from "@/utility/classes/EditClassModal";
import ViewClassModal from "@/utility/classes/ViewClassModal";
import DeleteClassModal from "@/utility/classes/DeleteClassModal";
import ClassesSkeleton from "@/skeletons/ClassesSkeleton";

interface ClassesProps {
  schoolId: string;
}

const Classes: React.FC<ClassesProps> = ({ schoolId }) => {
  const {
    data: classes,
    isLoading,
    error,
    addClass,
    editClass,
    deleteClass,
  } = useClasses(schoolId); // Pass schoolId to useClasses

  const queryClient = useQueryClient();

  const [selectedClass, setSelectedClass] = useState<>(null);
  const [modal, setModal] = useState<"add" | "edit" | "view" | "delete" | null>(
    null
  );
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const openModal = (type: "add" | "edit" | "view" | "delete", classItem) => {
    setSelectedClass(classItem);
    setModal(type);
    setModalError(null);
  };

  const closeModal = () => {
    setSelectedClass(null);
    setModal(null);
    setModalError(null);
  };

  const handleAdd = async (newClass) => {
    setModalLoading(true);
    setModalError(null);
    try {
      await addClass({ newClass }); // Pass as object
      closeModal();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Failed to add class");
    } finally {
      setModalLoading(false);
    }
  };

  const handleEdit = async (updatedClass) => {
    setModalLoading(true);
    setModalError(null);
    try {
      await editClass({ updatedClass }); // Pass as object
      closeModal();
    } catch (err) {
      setModalError(
        err instanceof Error ? err.message : "Failed to update class"
      );
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setModalLoading(true);
    setModalError(null);
    try {
      await deleteClass({ id }); // Pass as object
      closeModal();
    } catch (err) {
      setModalError(
        err instanceof Error ? err.message : "Failed to delete class"
      );
    } finally {
      setModalLoading(false);
    }
  };

  if (isLoading) return <ClassesSkeleton />;

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
        <Button
          onClick={() => openModal("add")}
          className="flex items-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Class</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 mt-12 animate-pulse">
          <div className="bg-gray-200 rounded-full p-4 mb-4">
            <GraduationCap className="h-12 w-12 text-primary-700" />
          </div>
          <div className="h-6 w-48 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 w-80 max-w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 max-w-full bg-gray-200 rounded mb-6"></div>
          <div className="h-10 w-40 bg-primary-600/70 rounded-md"></div>
        </div>
      ) : Array.isArray(classes) && classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {classes.map((classItem) => (
            <Card
              key={classItem.classId}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="h-5 w-5 text-primary-600" />
                  <span className="text-sm sm:text-base">
                    {classItem.className} {classItem.classSection}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "classTeacher",
                  "students",
                  "assignedTeacher",
                  "attendance",
                ].map((field) => {
                  const label =
                    field === "classTeacher"
                      ? "Class Teacher"
                      : field === "students"
                        ? "Total Students"
                        : field === "assignedTeacher"
                          ? "Assigned Teachers"
                          : "Attendance";
                  let value = classItem[field];
                  if (field === "assignedTeacher") value = value?.length;
                  return (
                    <div
                      key={field}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">{label}:</span>
                      <span className="text-sm font-medium">
                        {value ?? "N/A"}
                      </span>
                    </div>
                  );
                })}
                <div className="pt-3 space-y-2 w-full">
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal("edit", classItem)}
                      className="w-1/2"
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal("view", classItem)}
                      className="w-1/2"
                    >
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openModal("delete", classItem)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 mt-12">
          <div className="bg-gray-200 rounded-full p-4 mb-4">
            <GraduationCap className="h-12 w-12 text-primary-700" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-800 mb-2">
            No Classes Found
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-md mb-6">
            🚀 It looks like you haven’t added any classes yet. Start by
            creating your first class.
          </p>
          <Button
            onClick={() => openModal("add")}
            className="flex items-center space-x-2 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Class</span>
          </Button>
        </div>
      )}

      {modal === "add" && (
        <AddClassModal
          onClose={closeModal}
          onSave={handleAdd}
          loading={modalLoading}
          error={modalError}
        />
      )}
      {modal === "edit" && selectedClass && (
        <EditClassModal
          classData={selectedClass}
          onClose={closeModal}
          onSave={handleEdit}
          loading={modalLoading}
          error={modalError}
        />
      )}
      {modal === "view" && selectedClass && (
        <ViewClassModal classData={selectedClass} onClose={closeModal} />
      )}
      {modal === "delete" && selectedClass && (
        <DeleteClassModal
          classData={selectedClass}
          onClose={closeModal}
          onDelete={() => handleDelete(selectedClass.classId)}
          loading={modalLoading}
          error={modalError}
        />
      )}
    </div>
  );
};

export default Classes;
