using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.Models
{
    public class School
    {
        public Guid Id { get; set; }
        public string RegistrationNumber { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int PinCode { get; set; }
        public int Subscription { get; set; } = 0;
        public DateOnly? SubscriptionDate { get; set; }
        public bool IsSoftDeleted { get; set; } = false;

        public Guid? UserId { get; set; }
        public ApplicationUser User { get; set; }


    }
}
