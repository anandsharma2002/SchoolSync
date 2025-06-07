using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateSchoolRequestDto
    {
        public string SchoolName { get; set; }

        public string SchoolEmail { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public int PinCode { get; set; }
    }
}
