using Microsoft.AspNetCore.Identity;

namespace SMSDataModel.Model.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public DateOnly CreatedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        // ✅ Foreign key: each user belongs to one school
        public Guid SchoolId { get; set; }
        public School School { get; set; }

        // Optional: define role inside the school (Teacher, Admin, Student, etc.)
        public string Role { get; set; }
    }
}
