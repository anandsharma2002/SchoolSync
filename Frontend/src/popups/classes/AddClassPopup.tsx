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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddClassPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (classData) => void;
}

const AddClassPopup: React.FC<AddClassPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    className: "",
    classSection: "",
    classTeacher: "",
    // capacity: "",
    // room: "",
    // description: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.className || !formData.classSection) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    setFormData({
      className: "",
      classSection: "",
      classTeacher: "",
      // capacity: "",
      // room: "",
      // description: "",
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="className">Class Name *</Label>
              <Input
                id="className"
                value={formData.className}
                onChange={(e) => handleChange("className", e.target.value)}
                placeholder="e.g., Grade 10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classSection">Section *</Label>
              <Input
                id="classSection"
                value={formData.classSection}
                onChange={(e) => handleChange("classSection", e.target.value)}
                placeholder="e.g., A"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="classTeacher">Class Teacher</Label>
            <Select
              onValueChange={(value) => handleChange("classTeacher", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher1">Ms. Sarah Smith</SelectItem>
                <SelectItem value="teacher2">Mr. John Johnson</SelectItem>
                <SelectItem value="teacher3">Ms. Emily Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => handleChange("room", e.target.value)}
                placeholder="Room A-101"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Class description"
            />
          </div> */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassPopup;
