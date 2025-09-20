using SchoolSync.Domain.enums;

namespace SchoolSync.Domain.Models
{
    public class Teacher
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateOnly JoiningDate { get; set; }
        public string Phone { get; set; }
        public Gender Gender { get; set; }
        public string Address { get; set; }
        // School
        public Guid SchoolId { get; set; }
        public School School { get; set; }
        // UserId
        public Guid? UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}
