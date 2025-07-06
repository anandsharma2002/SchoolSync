using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateTeacherRqstDto
    {
        [Required]
        public string TeacherName { get; set; }
        [Required]
        [EmailAddress]
        public string TeacherEmailId { get; set; }
        [EmailAddress]
        public string ?TeacherMailId { get; set; }
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public Guid SchoolId { get; set; }

    }
}
