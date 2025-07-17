import React, { useEffect, useState } from "react";
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
const server_url = import.meta.env.VITE_API_URL;

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
    name: "",
    section: "",
    classTeacherId: "",
    // capacity: "",
    // room: "",
    // description: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.section) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    setFormData({
      name: "",
      section: "",
      classTeacherId: "",
      // capacity: "",
      // room: "",
      // description: "",
    });
    onClose();
  };

  const [teachers,setTeachers] = useState([]);

  const fetchTeachers = async() =>{
      const res = await fetch(`${server_url}/api/Teacher`);
      if(!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      if(!json.isSuccess) throw new Error(json.errorMessage);
      setTeachers(json.content);
      return json;
    }
  
    useEffect(()=>{
       const timeout =  setTimeout(()=>fetchTeachers(),1000);
      return () => clearTimeout(timeout);
    },[])

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
              <Label htmlFor="name">Class Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Grade 10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section">Section *</Label>
              <Input
                id="section"
                value={formData.section}
                onChange={(e) => handleChange("section", e.target.value)}
                placeholder="e.g., A"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="classTeacherId">Class Teacher</Label>
            <Select
              onValueChange={(value) => handleChange("classTeacherId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers?.map((teacher) => (<SelectItem value={teacher.id}>{teacher.name}</SelectItem> ))}
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
