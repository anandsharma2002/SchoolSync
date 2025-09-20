namespace SchoolSync.Domain.RequestDtos
{
    public class CreateAttendanceRqstDto
    {
        public Guid StudentId { get; set; }
        public Guid SchoolId { get; set; }
        public DateOnly Date { get; set; }
        public string Status { get; set; }


    }
}
