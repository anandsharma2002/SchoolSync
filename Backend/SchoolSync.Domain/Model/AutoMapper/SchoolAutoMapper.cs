using AutoMapper;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.Domain.AutoMapper
{
    public class SchoolAutoMapper : Profile
    {

        public SchoolAutoMapper()
        {
            CreateMap<School, CreateSchoolRequestDto>().ReverseMap();
        }

    }
}
