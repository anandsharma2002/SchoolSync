using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SMSDataModel.Model.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public DateOnly CreatedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        public Guid? SchoolId { get; set; }
        public School School { get; set; }
    }
}
