using System.ComponentModel.DataAnnotations;

namespace SchoolSync.Domain.RequestDtos
{
    public class CreateClassRequestDto
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(5)]
        public string Section { get; set; }
        public Guid? ClassTeacherId { get; set; }
        [Required]
        public Guid SchoolId { get; set; }
    }
}