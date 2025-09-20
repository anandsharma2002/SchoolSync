using SchoolSync.Domain.Models;

namespace SchoolSync.InfrastructureInterfaces
{
    public interface IAnnouncementRepository
    {
        Task<IEnumerable<Announcement>> GetAllAnnouncemetsAsync(Guid schoolid);
        Task<Announcement> GetAnnouncementByIdAsync(Guid AnnoucementId);
        Task<Announcement> CreateAnnouncementAsync(Announcement announcement);
        Task<Announcement> UpdateAnnouncementAsync(Announcement updatedAnnouncement);
        Task<Announcement> DeleteAnnouncementAsync(Announcement existingAnnouncement);
    }
}
