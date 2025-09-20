using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SchoolSync.Domain.enums;

namespace SchoolSync.Domain.RequestDtos
{
    public class UpdateTeacherRequestDto
    {

        public string Name { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        [MaxLength(12)]
        public string Phone { get; set; }
        public string Address { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Gender Gender { get; set; }
    }
}
