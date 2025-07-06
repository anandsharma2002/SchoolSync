using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateSchoolRequestDto
    {
        [Required]
        [MaxLength(100)]
        public string SchoolName { get; set; }
        [Required]
        [EmailAddress]
        public string SchoolEmail { get; set; }
        [Required]
        [Phone]
        [MaxLength(12)]
        public string PhoneNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Range(100000, 999999, ErrorMessage = "Pincode must be a 6-digit number")]
        public int PinCode { get; set; }
        [Range(0, 3, ErrorMessage = "Subscription must be between 0 and 3")]
        public int Subscription { get; set; } = 0;
        public DateOnly? SubscriptionDate { get; set; }
    }
}
