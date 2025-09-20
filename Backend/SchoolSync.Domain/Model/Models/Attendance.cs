using SchoolSync.Domain.enums;

namespace SchoolSync.Domain.Models
{
    public class Attendance
    {
        public Guid Id { get; set; }
        public DateOnly Date { get; set; }
        public AttendanceStatus Status { get; set; }
        public AttendanceUser AttendanceUser { get; set; }
    }
}
