using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.Models
{
    public class SchoolRole
    {
        public Guid Id { get; set; }= Guid.NewGuid();
        public string RoleName { get; set; }
        public Guid SchoolId { get; set; } 
        public School School { get; set; }
    }
}
