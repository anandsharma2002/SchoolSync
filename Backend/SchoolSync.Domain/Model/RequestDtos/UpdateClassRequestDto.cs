using System.ComponentModel.DataAnnotations;

namespace SchoolSync.Domain.RequestDtos
{
    public class UpdateClassRequestDto
    {

        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(5)]
        public string Section { get; set; }
        public Guid? ClassTeacherId { get; set; }
    }
}
