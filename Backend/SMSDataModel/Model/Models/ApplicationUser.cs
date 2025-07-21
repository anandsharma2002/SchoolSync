using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SMSDataModel.Model.Models
{
    public class ApplicationUser : IdentityUser
    {
        public Guid UserId { get; set; }
        public string Role { get; set; }
        public DateOnly CreatedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    }
}
