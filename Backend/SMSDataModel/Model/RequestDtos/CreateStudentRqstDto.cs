using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateStudentRqstDto
    {
        [Required]
        public int StudentSRNumber { get; set; }
        [Required]
        public int RollNumber { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [Phone]
        [MaxLength(12)]
        public string PhoneNumber { get; set; }
        [Required]
        public DateOnly DOB { get; set; }
        [Required]
        [MaxLength(10)]
        public string Gender { get; set; }
        [Required]
        [MaxLength(100)]
        public string FatherName { get; set; }
        [Required]
        [MaxLength(100)]
        public string MotherName { get; set; }
        [EmailAddress]
        public string? StudentMailId { get; set; }
        [Required]
        [EmailAddress]
        public string ParentEmailId { get; set; }
        [Required]
        [Phone]
        [MaxLength(12)]
        public string ParentPhoneNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public Guid SchoolId { get; set; }
        [Required]
        public Guid ClassId { get; set; }

    }
}
