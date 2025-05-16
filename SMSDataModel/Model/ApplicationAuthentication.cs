using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;


namespace SMSDataModel.Model
{
    public class ApplicationAuthentication : IdentityUser
    {
        Guid SchoolId { get; set; }
        string SchoolEmailId { get; set; }
        string SchoolName { get; set; }
        string Password { get; set; }
        string Role { get; set; }
        bool IsSubscriptionActive { get; set; }
        string Address { get; set; }
        string City { get; set; }
        string State { get; set; }
        int PinCode { get; set; }
    }
}
