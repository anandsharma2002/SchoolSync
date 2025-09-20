using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.ApplicationInterfaces
{
    public interface ISchoolClassServices
    {
        Task<List<SchoolClass>> GetAllClassesAsync(Guid schoolId);
        Task<SchoolClass> GetClassByIdAsync(Guid id);
        Task<SchoolClass> CreateClassAsync(CreateClassRequestDto createClassRequestDto);
        Task<SchoolClass> UpdateClassAsync(Guid id, UpdateClassRequestDto updatedClass);
        Task<SchoolClass> DeleteClassAsync(Guid id);
    }
}
