using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.Models
{
    public class Student
    {
        public Guid StudentId { get; set; }
        public int StudentSRNumber { get; set; }
        public int RollNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public string PhoneNumber { get; set; }
        public DateOnly DOB { get; set; }
        public string Gender { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string? StudentMailId { get; set; }
        public string ParentEmailId { get; set; }
        public string ParentPhoneNumber { get; set; }

        public string Address { get; set; }

        public Guid SchoolId { get; set; }
        public School School { get; set; }

        public Guid ClassId { get; set; }
        //public SchoolClass Class { get; set; }

    }
}
