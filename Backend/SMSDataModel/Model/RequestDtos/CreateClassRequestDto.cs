using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateClassRequestDto
    {
        public string ClassName { get; set; }
        public Guid SchoolId { get; set; }
    }
}
