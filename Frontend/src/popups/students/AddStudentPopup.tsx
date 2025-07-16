import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AddStudentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: any) => void;
}

const AddStudentPopup: React.FC<AddStudentPopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNumber: '',
    classId: '',
    studentMailId: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    fatherName: '',
    motherName: '',
    parentEmailId: '',
    parentPhoneNumber: '',
    address: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.rollNumber || !formData.classId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      rollNumber: '',
      classId: '',
      studentMailId: '',
      phoneNumber: '',
      dob: '',
      gender: '',
      fatherName: '',
      motherName: '',
      parentEmailId: '',
      parentPhoneNumber: '',
      address: ''
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number *</Label>
              <Input
                id="rollNumber"
                type="number"
                value={formData.rollNumber}
                onChange={(e) => handleChange('rollNumber', e.target.value)}
                placeholder="Enter roll number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classId">Class *</Label>
              <Select onValueChange={(value) => handleChange('classId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-9a">Class 9A</SelectItem>
                  <SelectItem value="class-9b">Class 9B</SelectItem>
                  <SelectItem value="class-10a">Class 10A</SelectItem>
                  <SelectItem value="class-10b">Class 10B</SelectItem>
                  <SelectItem value="class-11a">Class 11A</SelectItem>
                  <SelectItem value="class-12a">Class 12A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentMailId">Student Email</Label>
              <Input
                id="studentMailId"
                type="email"
                value={formData.studentMailId}
                onChange={(e) => handleChange('studentMailId', e.target.value)}
                placeholder="student@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                placeholder="+1 234 567 8901"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => handleChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fatherName">Father's Name</Label>
              <Input
                id="fatherName"
                value={formData.fatherName}
                onChange={(e) => handleChange('fatherName', e.target.value)}
                placeholder="Enter father's name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherName">Mother's Name</Label>
              <Input
                id="motherName"
                value={formData.motherName}
                onChange={(e) => handleChange('motherName', e.target.value)}
                placeholder="Enter mother's name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="parentEmailId">Parent Email</Label>
              <Input
                id="parentEmailId"
                type="email"
                value={formData.parentEmailId}
                onChange={(e) => handleChange('parentEmailId', e.target.value)}
                placeholder="parent@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentPhoneNumber">Parent Phone</Label>
              <Input
                id="parentPhoneNumber"
                value={formData.parentPhoneNumber}
                onChange={(e) => handleChange('parentPhoneNumber', e.target.value)}
                placeholder="+1 234 567 8901"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter full address"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentPopup;