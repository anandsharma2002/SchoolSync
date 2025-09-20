using Microsoft.EntityFrameworkCore;
using SchoolSync.Domain.Models;
using SchoolSync.InfrastructureInterfaces;
using SchoolSync.Persistence;

namespace SchoolSync.Infrastructure
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        public readonly DataContext _Context;
        public AnnouncementRepository(DataContext context)
        {
            _Context = context;
        }
        public async Task<IEnumerable<Announcement>> GetAllAnnouncemetsAsync(Guid schoolid)
        {
            return await _Context.Announcements.Where(x => x.SchoolId == schoolid).ToListAsync();
        }
        public async Task<Announcement> GetAnnouncementByIdAsync(Guid AnnoucementId)
        {
            var existingAnnouncement = await _Context.Announcements.FindAsync(AnnoucementId);
            return existingAnnouncement;
        }
        public async Task<Announcement> CreateAnnouncementAsync(Announcement announcement)
        {
            await _Context.Announcements.AddAsync(announcement);
            await _Context.SaveChangesAsync();
            return announcement;
        }
        public async Task<Announcement> UpdateAnnouncementAsync(Announcement updatedAnnouncement)
        {
            var result = _Context.Announcements.Update(updatedAnnouncement);
            await _Context.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<Announcement> DeleteAnnouncementAsync(Announcement existingAnnouncement)
        {
            var result = _Context.Announcements.Remove(existingAnnouncement);
            await _Context.SaveChangesAsync();
            return existingAnnouncement;
        }


    }
}
