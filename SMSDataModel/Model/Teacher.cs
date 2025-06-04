using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model
{
    public class Teacher
    {
        public Guid TeacherId { get; set; }
        public string TeacherName { get; set; }
        public string TeacherEmail { get; set; }
        public string PhoneNumber { get; set; }
        public string Subject { get; set; }
        public Guid SchoolId { get; set; }
        public School School { get; set; }

    }
}
