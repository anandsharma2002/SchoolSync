using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model
{
    public class School
    {
        public Guid SchoolId { get; set; }
        public string SchoolName { get; set; }
        [AllowNull]
        public string SchoolEmail { get; set; }
        [AllowNull]
        public double PhoneNumber { get; set; }
        [AllowNull]
        public string Address { get; set; }
        [AllowNull]
        public string City { get; set; }
        [AllowNull]
        public string State { get; set; }
        [AllowNull]
        public int PinCode { get; set; }
    }
}
