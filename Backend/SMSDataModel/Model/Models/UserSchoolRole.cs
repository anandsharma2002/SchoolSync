using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.Models
{
    public class UserSchoolRole
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid SchoolRoleid {  get; set; }
        public SchoolRole SchoolRole { get; set; }
        public Guid SchoolId {  get; set; }
        public School School { get; set; }

    }
}
