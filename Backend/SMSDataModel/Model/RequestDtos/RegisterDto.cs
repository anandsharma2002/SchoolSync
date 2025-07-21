using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class RegisterDto
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }   // Admin, Teacher, Student, etc.
        public Guid? SchoolId { get; set; } // School in which user is registered
        public string Password { get; set; }
    }
}
