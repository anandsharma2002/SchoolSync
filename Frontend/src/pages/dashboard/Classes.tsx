import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Book, Eye, Pencil, Trash2, GraduationCap } from "lucide-react";
import { useClasses } from "@/hooks/useClasses";
import ClassesSkeleton from "@/skeletons/ClassesSkeleton";
import AddClassPopup from "@/popups/classes/AddClassPopup";
import EditClassPopup from "@/popups/classes/EditClassPopup";
import ViewClassPopup from "@/popups/classes/ViewClassPopup";
import DeleteClassPopup from "@/popups/classes/DeleteClassPopup";

const Classes: React.FC = () => {
  const {
    data: classes,
    isLoading,
    error,
    addClass,
    editClass,
    deleteClass,
  } = useClasses();
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [modal, setModal] = useState<"add" | "edit" | "view" | "delete" | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (
    type: "add" | "edit" | "view" | "delete",
    classItem?: ClassItem
  ) => {
    setIsOpen(true);
    setSelectedClass(classItem || null);
    setModal(type);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedClass(null);
    setModal(null);
  };

  const handleAdd = async (newClass: ClassItem) => {
    try {
      await addClass({ newClass }); // Pass as object
      closeModal();
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Failed to add class");
    }
  };

  const handleEdit = async (updatedClass: ClassItem) => {
    if (!selectedClass) return;
    try {
      await editClass({ ...selectedClass, ...updatedClass });
      closeModal();
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "Failed to update class"
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteClass({ id }); // Pass as object
      closeModal();
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "Failed to delete class"
      );
    }
  };

  if (isLoading) return <ClassesSkeleton />;

  if (error) return <div>Error loading classes: {error.message}</div>;

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
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Class</span>
        </Button>
      </div>

      {Array.isArray(classes) && classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {classes.map((classItem) => (
            <Card
              key={classItem.id}
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Class Teacher:</span>
                  <span className="text-sm font-medium">
                    {classItem.classTeacher ?? "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Students:</span>
                  <span className="text-sm font-medium">
                    {classItem.students ?? "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Attendance:</span>
                  <span className="text-sm font-medium">
                    {classItem.attendance ?? "N/A"}
                  </span>
                </div>
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
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Class</span>
          </Button>
        </div>
      )}

      {modal === "add" && (
        <AddClassPopup
          isOpen={isOpen}
          onClose={closeModal}
          onSave={handleAdd}
        />
      )}
      {modal === "edit" && selectedClass && (
        <EditClassPopup
          isOpen={isOpen}
          classData={selectedClass}
          onClose={closeModal}
          onSave={handleEdit}
        />
      )}
      {modal === "view" && selectedClass && (
        <ViewClassPopup
          isOpen={isOpen}
          classData={selectedClass}
          onClose={closeModal}
        />
      )}
      {modal === "delete" && selectedClass && (
        <DeleteClassPopup
          isOpen={isOpen}
          classData={selectedClass}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Classes;
