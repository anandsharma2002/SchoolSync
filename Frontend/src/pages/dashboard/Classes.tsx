import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Users,
  Book,
  UserCheck,
  Edit,
  Eye,
  Trash2,
  GraduationCap,
} from "lucide-react";
import { useClasses } from "@/hooks/useClasses";

interface Class {
  classId: string;
  className: string;
  classSection: string;
  classTeacherId?: string;
  assignedTeacher?: string[];
  classTeacherName?: string;
  schoolId: string;
  studentCount?: number;
  room?: string;
  time?: string;
}

const Classes: React.FC = () => {
  const { data: classesData, isLoading, isError, error } = useClasses();
  const [classes, setClasses] = useState<Class[]>([]);

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Update local state when data changes
  // React.useEffect(() => {
  //   if (classesData) {
  //     setClasses(classesData);
  //   }
  // }, [classesData]);

  // if (isLoading)
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="text-lg">Loading...</div>
  //     </div>
  //   );
  // if (isError)
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="text-lgm text-destructive">Error: {error?.message}</div>
  //     </div>
  //   );

  const handleDeleteClass = (classId: string) => {
    setClasses(classes.filter((c) => c.classId !== classId));
  };

  const handleAddClass = (newClass: Omit<Class, "classId">) => {
    const classWithId = { ...newClass, classId: Date.now().toString() };
    setClasses([...classes, classWithId]);
    setIsAddOpen(false);
  };

  const handleEditClass = (updatedClass: Class) => {
    setClasses(
      classes.map((c) =>
        c.classId === updatedClass.classId ? updatedClass : c
      )
    );
    setIsEditOpen(false);
    setSelectedClass(null);
  };

  const openEdit = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsEditOpen(true);
  };

  const openView = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsViewOpen(true);
  };

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-6 mb-4">
        <GraduationCap className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Classes Found</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        You haven't created any classes yet. Start by adding your first class to
        organize your students and curriculum.
      </p>
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Your First Class</span>
          </Button>
        </DialogTrigger>
        <AddClassDialog onAdd={handleAddClass} />
      </Dialog>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Classes</h2>
          <p className="text-muted-foreground mt-2">
            Manage all your classes and schedules
          </p>
        </div>
        {classes.length > 0 && (
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                <span>Add New Class</span>
              </Button>
            </DialogTrigger>
            <AddClassDialog onAdd={handleAddClass} />
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {classes.length === 0 ? (
          <EmptyState />
        ) : (
          classes.map((classItem) => (
            <Card
              key={classItem.classId}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-sm sm:text-base">
                        {classItem.className} - Section {classItem.classSection}
                      </span>
                    </div>
                    <div className="ml-48">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          {/* <Button
                      variant="destructive"
                      size="sm"
                      className="col-span-2"
                    > */}
                          <Trash2 className="text-destructive h-4 w-4 mr-1" />
                          {/* Delete Class */}
                          {/* </Button> */}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the class "
                              {classItem.className} - Section{" "}
                              {classItem.classSection}" and remove all
                              associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteClass(classItem.classId)
                              }
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Class Teacher:
                  </span>
                  <span className="text-sm font-medium">
                    {classItem.classTeacherName || "Not Assigned"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Students:
                  </span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {classItem.studentCount || 0}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Assigned Teachers:
                  </span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {classItem.assignedTeacher?.length || 0}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Attendance:
                  </span>
                  <div className="flex items-center space-x-1">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">0/0</span>
                  </div>
                </div>
                <div className="pt-3 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(classItem)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openView(classItem)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {/* <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="col-span-2"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Class
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the class "{classItem.className} - Section{" "}
                          {classItem.classSection}" and remove all associated
                          data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteClass(classItem.classId)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        {selectedClass && (
          <EditClassDialog class={selectedClass} onEdit={handleEditClass} />
        )}
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        {selectedClass && <ViewClassDialog class={selectedClass} />}
      </Dialog>
    </div>
  );
};

// Add Class Dialog Component
const AddClassDialog: React.FC<{
  onAdd: (newClass: Omit<Class, "classId">) => void;
}> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    className: "",
    classSection: "",
    classTeacherName: "",
    room: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      schoolId: "school-1",
      studentCount: 0,
    });
    setFormData({
      className: "",
      classSection: "",
      classTeacherName: "",
      room: "",
      time: "",
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Class</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="className">Class Name</Label>
          <Input
            id="className"
            value={formData.className}
            onChange={(e) =>
              setFormData({ ...formData, className: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="classSection">Section</Label>
          <Input
            id="classSection"
            value={formData.classSection}
            onChange={(e) =>
              setFormData({ ...formData, classSection: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="classTeacherName">Class Teacher</Label>
          <Input
            id="classTeacherName"
            value={formData.classTeacherName}
            onChange={(e) =>
              setFormData({ ...formData, classTeacherName: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="room">Room</Label>
          <Input
            id="room"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="e.g., 9:00 AM - 10:30 AM"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="submit">Add Class</Button>
        </div>
      </form>
    </DialogContent>
  );
};

// Edit Class Dialog Component
const EditClassDialog: React.FC<{
  class: Class;
  onEdit: (updatedClass: Class) => void;
}> = ({ class: classItem, onEdit }) => {
  const [formData, setFormData] = useState({
    className: classItem.className,
    classSection: classItem.classSection,
    classTeacherName: classItem.classTeacherName || "",
    room: classItem.room || "",
    time: classItem.time || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({
      ...classItem,
      ...formData,
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Class</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="editClassName">Class Name</Label>
          <Input
            id="editClassName"
            value={formData.className}
            onChange={(e) =>
              setFormData({ ...formData, className: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="editClassSection">Section</Label>
          <Input
            id="editClassSection"
            value={formData.classSection}
            onChange={(e) =>
              setFormData({ ...formData, classSection: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="editClassTeacherName">Class Teacher</Label>
          <Input
            id="editClassTeacherName"
            value={formData.classTeacherName}
            onChange={(e) =>
              setFormData({ ...formData, classTeacherName: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="editRoom">Room</Label>
          <Input
            id="editRoom"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="editTime">Time</Label>
          <Input
            id="editTime"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="e.g., 9:00 AM - 10:30 AM"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="submit">Update Class</Button>
        </div>
      </form>
    </DialogContent>
  );
};

// View Class Dialog Component
const ViewClassDialog: React.FC<{ class: Class }> = ({ class: classItem }) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Class Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Class Name
          </Label>
          <p className="text-sm font-medium">{classItem.className}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Section
          </Label>
          <p className="text-sm font-medium">{classItem.classSection}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Class Teacher
          </Label>
          <p className="text-sm font-medium">
            {classItem.classTeacherName || "Not assigned"}
          </p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Room
          </Label>
          <p className="text-sm font-medium">{classItem.room || "TBD"}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Time
          </Label>
          <p className="text-sm font-medium">{classItem.time || "TBD"}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Student Count
          </Label>
          <p className="text-sm font-medium">{classItem.studentCount || 0}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">
            Class ID
          </Label>
          <p className="text-sm font-medium text-muted-foreground">
            {classItem.classId}
          </p>
        </div>
      </div>
    </DialogContent>
  );
};

export default Classes;
