using SchoolSync.Domain.Models;

namespace SchoolSync.InfrastructureInterfaces
{
    public interface ITeacherAttendanceRepository
    {
        Task<List<Attendance>> GetAllAttendancesOfTeachersAsync();
        Task<Attendance> GetTeacherByAttendanceIdAsync(Guid teacherAttendanceid);
        Task<Attendance> CreateTeacherAttendanceAsync(Attendance newTeacherAttendanceRqst);
        Task<Attendance> UpdateTeacherAttendandanceAsync(Attendance updatedTeacher);
        Task<Attendance> DeleteTeacherAttendanceAsync(Attendance existingTeacherAttendance);
    }
}
