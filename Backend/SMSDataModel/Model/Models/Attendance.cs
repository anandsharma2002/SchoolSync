using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.Models
{
    public class Attendance
    {
        public Guid AttendanceId { get; set; }
        public Guid StudentId { get; set; }
        public Guid SchoolClassId { get; set; }
        public DateOnly Date { get; set; }
        public string Status { get; set; }
        public Student Student { get; set; }
        public SchoolClass SchoolClass { get; set; }
    } 
}
