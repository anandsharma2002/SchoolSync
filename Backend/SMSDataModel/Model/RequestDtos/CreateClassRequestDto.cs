using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateClassRequestDto
    {
        [Required]
        [MaxLength(50)]
        public string ClassName { get; set; }
        [Required]
        [MaxLength(5)]
        public string ClassSection { get; set; }
        public Guid? ClassTeacherId { get; set; }
        [Required]
        public Guid SchoolId { get; set; }
    }
}
