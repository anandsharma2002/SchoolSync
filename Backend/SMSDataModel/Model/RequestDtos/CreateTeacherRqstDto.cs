using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateTeacherRqstDto
    {
        public string TeacherName { get; set; }
        public string TeacherEmail { get; set; }
        public string PhoneNumber { get; set; }
        public string Subject { get; set; }
        public Guid SchoolId { get; set; }
    }
}
