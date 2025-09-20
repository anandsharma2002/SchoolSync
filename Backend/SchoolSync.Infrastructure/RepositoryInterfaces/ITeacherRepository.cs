using SchoolSync.Domain.Models;

namespace SchoolSync.InfrastructureInterfaces
{
    public interface ITeacherRepository
    {
        Task<IEnumerable<Teacher>> GetAllTeachersAsync(Guid schoolId);
        Task<Teacher> GetTeacherByIdAsync(Guid id);
        Task<Teacher> CreateTeacherAsync(Teacher teacher);
        Task<Teacher> UpdateTeacherAsync(Teacher teacher);
        Task<Teacher> DeleteTeacherAsync(Guid id);
    }
}
