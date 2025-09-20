using AutoMapper;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.Domain.AutoMapper
{
    public class TeacherAutomapper : Profile
    {
        public TeacherAutomapper()
        {
            CreateMap<Teacher, CreateTeacherRqstDto>().ReverseMap();
            CreateMap<Teacher, UpdateTeacherRequestDto>().ReverseMap();
        }
    }
}
