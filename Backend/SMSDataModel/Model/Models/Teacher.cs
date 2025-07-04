using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.Models
{
    public class Teacher
    {
        public Guid TeacherId { get; set; }
        public string TeacherName { get; set; }
        [AllowNull]
        public string TeacherMailId{ get; set; }
        public string TeacherEmailId { get; set; }
        public string PhoneNumber { get; set; }
        public string Subject { get; set; }
        public string Address { get; set; }
        public Guid SchoolId { get; set; }
        public School School { get; set; }

    }
}
