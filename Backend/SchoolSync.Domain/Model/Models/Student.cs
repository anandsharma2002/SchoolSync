using SchoolSync.Domain.enums;

namespace SchoolSync.Domain.Models
{
    public class Student
    {
        public Guid Id { get; set; }
        public string SRNumber { get; set; }
        public int RollNumber { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DOB { get; set; }
        public Gender Gender { get; set; }
        public Guid ClassId { get; set; }
        public SchoolClass Class { get; set; }
        public Guid? UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
