namespace SchoolSync.Domain.Models
{
    public class TeacherSubject
    {
        public Guid Id { get; set; }
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid SchoolClassId { get; set; }
        public Teacher Teacher { get; set; }
        public Subject Subject { get; set; }
        public SchoolClass SchoolClass { get; set; }
    }
}
