using AutoMapper;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.Domain.AutoMapper
{
    public class StudentAutomapper : Profile
    {
        public StudentAutomapper()
        {
            CreateMap<Student, CreateStudentRqstDto>().ReverseMap();
            CreateMap<Student, UpdateStudentRequestDto>().ReverseMap();
        }
    }
}
