using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SchoolSync.Domain.enums;

namespace SchoolSync.Domain.RequestDtos
{
    public class CreateTeacherRqstDto
    {
        [Required]
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
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Gender gender { get; set; }
        [Required]
        public Guid SchoolId { get; set; }

    }
}
