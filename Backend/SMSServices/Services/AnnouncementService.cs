using AutoMapper;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSRepository.Repository;
using SMSRepository.RepositoryInterfaces;
using SMSServices.ServicesInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSServices.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IMapper _mapper;
        public AnnouncementService(IAnnouncementRepository announcementRepository, IMapper mapper)
        {
            _announcementRepository = announcementRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<Announcement>> GetAllAnnouncemetsAsync()
        {
            return await _announcementRepository.GetAllAnnouncemetsAsync();
        }
        public async Task<Announcement> GetAnnouncementByIdAsync(Guid AnnoucementId)
        {
            var result = await _announcementRepository.GetAnnouncementByIdAsync(AnnoucementId);
            if (result != null)
            {
                return result;
            }
            throw new Exception("Announcement not found!");
        }
        public async Task<School> createAnnouncementRqst(CreateAnnouncementRqstDto createAnnouncement)
        {
            var newAnnouncement = _mapper.Map<Announcement>(createAnnouncement);
            var existingAnnouncement = await _announcementRepository.AnnouncecemntExistsAsync(newAnnouncement);
            if (!existingAnnouncement)
            {
                var result = await _announcementRepository.CreateSchoolAsync(newAnnouncement);
                return result;
            }
            throw new Exception("School with this name, email and pin code already exists");
        }
    }
}
