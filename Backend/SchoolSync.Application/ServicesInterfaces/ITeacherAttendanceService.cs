using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.ApplicationInterfaces
{
    public interface ITeacherAttendanceService
    {
        Task<List<Attendance>> GetAllAttendancesOfTeachersAsync();
        Task<Attendance> GetTeacherByAttendanceIdAsync(Guid teacherAttendanceid);
        Task<Attendance> CreateTeacherAttendanceAsync(CreateTeacherAttendanceDto newTeacherAttendanceRqst);
        Task<Attendance> UpdatedTeacherAttendanceAsync(Guid id, CreateTeacherAttendanceDto updatedTeacher);
        Task<Attendance> DeleteTeacherAttendanceAsync(Guid id);
    }
}
