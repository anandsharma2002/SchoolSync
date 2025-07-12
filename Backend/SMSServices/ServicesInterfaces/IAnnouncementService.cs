using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSServices.ServicesInterfaces
{
    public interface IAnnouncementService
    {
        Task<IEnumerable<Announcement>> GetAllAnnouncemetsAsync();
        Task<Announcement> GetAnnouncementByIdAsync(Guid AnnoucementId);
        Task<Announcement> CreateAnnouncementAsync(CreateAnnouncementRqstDto createAnnouncement);
        Task<Announcement> UpdateAnnouncementAsync(Guid id, CreateAnnouncementRqstDto updatedAnnouncement);
        Task<Announcement> DeleteAnnouncementAsync(Guid id);
    }
}
