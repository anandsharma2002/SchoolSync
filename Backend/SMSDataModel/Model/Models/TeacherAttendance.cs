using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.Models
{
    public class TeacherAttendance
    {
        public Guid TeacherAttendanceId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid SchoolId { get; set; }
        public DateOnly Date { get; set; }
        public string Status { get; set; }
        public Teacher Teacher { get; set; }
        public School School { get; set; }

    }
}
