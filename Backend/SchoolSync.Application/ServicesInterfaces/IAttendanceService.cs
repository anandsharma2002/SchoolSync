using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.ApplicationInterfaces
{
    public interface IAttendanceService
    {
        Task<List<Attendance>> GetAllAttendancesOfStudentsAsync();
        Task<Attendance> GetAttendanceByIdAsync(Guid id);
        Task<Attendance> CreateAttendanceAsync(CreateAttendanceRqstDto newAttendanceRqst);
        Task<Attendance> updatedAttendanceAsync(Guid id, CreateAttendanceRqstDto updatedClass);
        Task<Attendance> DeleteAttendanceAsync(Guid id);
    }
}
