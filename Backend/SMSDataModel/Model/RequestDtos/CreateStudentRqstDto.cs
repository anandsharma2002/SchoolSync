using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateStudentRqstDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateOnly DOB { get; set; }
        public string Gender { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string ParentEmailId { get; set; }
        public string ParentPhoneNumber { get; set; }
        public Guid SchoolId { get; set; }
        public Guid ClassId { get; set; }

    }
}
