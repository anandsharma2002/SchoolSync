using AutoMapper;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.Domain.AutoMapper
{
    public class AnnouncementAutomapper : Profile
    {
        public AnnouncementAutomapper()
        {
            CreateMap<Announcement, CreateAnnouncementRqstDto>().ReverseMap();
            CreateMap<Announcement, UpdateAnnouncementRequestDto>().ReverseMap();
        }
    }
}
