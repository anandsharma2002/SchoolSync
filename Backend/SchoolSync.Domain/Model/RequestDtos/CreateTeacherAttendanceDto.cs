namespace SchoolSync.Domain.RequestDtos
{
    public class CreateTeacherAttendanceDto
    {
        public Guid TeacherId { get; set; }
        public Guid SchoolId { get; set; }
        public DateOnly Date { get; set; }
        public string Status { get; set; }

    }
}
