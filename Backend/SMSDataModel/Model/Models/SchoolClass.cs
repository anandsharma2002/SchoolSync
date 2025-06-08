using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.Models
{
    public class SchoolClass
    {
        [Key]
        public Guid ClassId { get; set; }
        public string ClassName { get; set; }
        public Guid SchoolId { get; set; }
        public School School { get; set; }
    }
}
