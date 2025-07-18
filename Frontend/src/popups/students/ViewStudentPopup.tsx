import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Hash, ClipboardList } from "lucide-react";

interface ViewStudentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  studentData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    rollNumber: string;
    className: string;
    dob: string;
    gender: string;
  } | null;
}

const ViewStudentPopup: React.FC<ViewStudentPopupProps> = ({
  isOpen,
  onClose,
  studentData,
}) => {
  if (!studentData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <User className="h-6 w-6 text-primary" />
            {studentData.firstName} {studentData.lastName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-2">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Email</p>
              <p className="text-sm">{studentData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Roll Number</p>
              <p className="text-sm">{studentData.rollNumber || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Class</p>
              <p className="text-sm">{studentData.class.name + " " +studentData.class.section || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Date of Birth</p>
              <p className="text-sm">
                {studentData.dob
                  ? new Date(studentData.dob).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Gender</p>
              <p className="text-sm">{studentData.gender || "N/A"}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStudentPopup;
