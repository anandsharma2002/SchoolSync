using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.ApplicationInterfaces
{
    public interface ITeacherService
    {
        Task<IEnumerable<Teacher>> GetAllTeachersAsync(Guid schoolId);
        Task<Teacher> GetTeacherByIdAsync(Guid id);
        Task<Teacher> CreateTeacherAsync(CreateTeacherRqstDto teacherRqstDto);
        Task<Teacher> UpdateTeacherAsync(Guid id, UpdateTeacherRequestDto updateTeacherRequestDto);
        Task<Teacher> DeleteTeacherAsync(Guid id);
    }
}
