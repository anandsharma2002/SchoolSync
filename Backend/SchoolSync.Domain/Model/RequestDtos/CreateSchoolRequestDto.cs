using System.ComponentModel.DataAnnotations;

namespace SchoolSync.Domain.RequestDtos
{
    public class CreateSchoolRequestDto
    {
        [Required]
        public string RegistrationNumber { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Phone]
        [MaxLength(12)]
        public string Phone { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Range(100000, 999999, ErrorMessage = "Pincode must be a 6-digit number")]
        public int PinCode { get; set; }
    }
}

