using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMSDataModel.Model.Models;

namespace SMSDataModel.Model.RequestDtos
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
        public Guid SchoolId { get; set; }

    }
}
