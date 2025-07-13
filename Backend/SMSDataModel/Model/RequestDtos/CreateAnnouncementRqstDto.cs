using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateAnnouncementRqstDto
    {
        public Guid SchoolId { get; set; }
        public string Title { get; set; }
        public string AnnouncementDetail { get; set; }
        public DateOnly AnnouncementDate { get; set; }
        public string AnnouncedBy { get; set; }
    }
}
