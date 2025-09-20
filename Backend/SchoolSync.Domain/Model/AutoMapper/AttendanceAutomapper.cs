using AutoMapper;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.Domain.AutoMapper
{
    public class AttendanceAutomapper : Profile
    {
        public AttendanceAutomapper()
        {
            CreateMap<Attendance, CreateAttendanceRqstDto>().ReverseMap();
        }
    }
}
