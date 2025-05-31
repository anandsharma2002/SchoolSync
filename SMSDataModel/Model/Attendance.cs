using SMSDataModel.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model
{
    public class Attendance
    {
        public Guid AttendanceId { get; set; }
        public Guid StudentId { get; set; }
        public Student Student { get; set; }
        public Guid ClassId { get; set; }
        public Class Class { get; set; }
        public Guid SchoolId { get; set; }
        public School School { get; set; }
        public DateOnly Date { get; set; }
        public AttendanceStatus Status { get; set; }

    }
}
