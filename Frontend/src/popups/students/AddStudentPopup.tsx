import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useClasses } from "@/hooks/useClasses";

interface AddTeacherPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teacherData: TeacherFormData) => void;
}

interface TeacherFormData {
  srNumber: string;
  rollNumber:string;
  firstName: string;
  lastName: string;
  email: string;
  classId: string;
  dob: string;
  gender: string;
}

const AddTeacherPopup: React.FC<AddTeacherPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { toast } = useToast();
  const { data: classes, isLoading, error } = useClasses();

  const [formData, setFormData] = useState<TeacherFormData>({
    srNumber: "",
    rollNumber:"",
    firstName: "",
    lastName: "",
    email: "",
    classId: "",
    dob: "",
    gender: "",
  });

  const handleChange = (field: keyof TeacherFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.srNumber ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.classId||
      !formData.dob||
      !formData.gender
    ) {
      toast({
        title: "Error",
        description:
          "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);

    setFormData({
      srNumber: "",
      rollNumber:"",
      firstName: "",
      lastName: "",
      email: "",
      classId: "",
      dob: "",
      gender: "",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="srNumber">Sr No *</Label>
            <Input
              id="srNumber"
              value={formData.srNumber}
              onChange={(e) => handleChange("srNumber", e.target.value)}
              placeholder="e.g., 2001"
              required
            />
          </div>
            <div className="space-y-2">
              <Label htmlFor="srNumber">Roll Number *</Label>
              <Input
                id="rollNumber"
                value={formData.rollNumber}
                onChange={(e) => handleChange("rollNumber", e.target.value)}
                placeholder="e.g., 2001"
                required
              />
            </div>

          <div className="grid grid-cols-2 gap-x-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="e.g., John"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="e.g., Smith"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="e.g., john.smith@example.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-x-6">
            <div className="space-y-2">
              <Label htmlFor="classId">Class</Label>
              {isLoading ? (
                <div>Loading classes...</div>
              ) : error ? (
                <div className="text-red-500">Error loading classes</div>
              ) : (
                <select
                  id="classId"
                  value={formData.classId}
                  onChange={(e) => handleChange("classId", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select a class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} {cls.section}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>


          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Teacher</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacherPopup;
