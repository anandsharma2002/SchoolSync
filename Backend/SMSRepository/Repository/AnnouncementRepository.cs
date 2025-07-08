using Microsoft.EntityFrameworkCore;
using SMSDataContext.Data;
using SMSDataModel.Model.Models;
using SMSRepository.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSRepository.Repository
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        public readonly DataContext _Context;
        public AnnouncementRepository(DataContext context)
        {
            _Context = context;
        }
        public async Task<IEnumerable<Announcement>> GetAllAnnouncemetsAsync()
        {
            return await _Context.Announcements.ToListAsync();
        }
        public async Task<Announcement> GetAnnouncementByIdAsync(Guid AnnoucementId)
        {
            var existingAnnouncement = await _Context.Announcements.FindAsync(AnnoucementId);
            return existingAnnouncement;
        }


    }
}
