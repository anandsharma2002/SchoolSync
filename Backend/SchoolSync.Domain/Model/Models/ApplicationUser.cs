using Microsoft.AspNetCore.Identity;

namespace SchoolSync.Domain.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public DateOnly CreatedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        public Guid SchoolId { get; set; }
        public School School { get; set; }

    }
}
