using SchoolSync.Domain.Models;

namespace SchoolSync.InfrastructureInterfaces
{
    public interface IClassRepository
    {
        Task<List<SchoolClass>> GetAllClassesAsync(Guid schoolId);
        Task<SchoolClass> GetClassByIdAsync(Guid classId);
        Task<SchoolClass> CreateClassAsync(SchoolClass newClass);
        Task<SchoolClass> UpdateClassAsync(SchoolClass updatedClass);
        Task<SchoolClass> DeleteClassAsync(SchoolClass existingClass);


    }
}
