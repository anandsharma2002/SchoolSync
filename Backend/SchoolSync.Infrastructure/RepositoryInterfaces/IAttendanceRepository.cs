using SchoolSync.Domain.Models;

namespace SchoolSync.InfrastructureInterfaces
{
    public interface IAttendanceRepository
    {
        Task<List<Attendance>> GetAllAttendancesOfStudentsAsync();
        Task<Attendance> GetAttendanceByIdAsync(Guid id);
        Task<Attendance> CreateAttendanceAsync(Attendance newAttendanceRqst);
        Task<Attendance> updatedAttendanceAsync(Attendance updatedAttendance);
        Task<Attendance> DeleteAttendanceAsync(Attendance existingAttendance);
    }
}
