using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.ApplicationInterfaces
{
    public interface IAnnouncementService
    {
        Task<IEnumerable<Announcement>> GetAllAnnouncemetsAsync(Guid schoolid);
        Task<Announcement> GetAnnouncementByIdAsync(Guid AnnoucementId);
        Task<Announcement> CreateAnnouncementAsync(CreateAnnouncementRqstDto createAnnouncement);
        Task<Announcement> UpdateAnnouncementAsync(Guid id, UpdateAnnouncementRequestDto updateAnnouncementRequestDto);
        Task<Announcement> DeleteAnnouncementAsync(Guid id);
    }
}
