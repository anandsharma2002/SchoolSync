using AutoMapper;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.Domain.AutoMapper
{
    public class SchoolClassAutoMapper : Profile
    {
        public SchoolClassAutoMapper()
        {
            CreateMap<SchoolClass, CreateClassRequestDto>().ReverseMap();
        }

    }
}
