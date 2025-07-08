using SMSDataModel.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSRepository.RepositoryInterfaces
{
    public interface IAnnouncementRepository
    {
        Task<IEnumerable<Announcement>> GetAllAnnouncemetsAsync();
        Task<Announcement> GetAnnouncementByIdAsync(Guid AnnoucementId);
    }
}
