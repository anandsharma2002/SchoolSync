using SchoolSync.Domain.Models;
using SchoolSync.Domain.ResponseDtos;

namespace SchoolSync.InfrastructureInterfaces
{
    public interface ISchoolRepository
    {
        Task<bool> SchoolExistsAsync(School school);
        Task<IEnumerable<School>> GetAllSchoolsAsync();
        Task<List<SchoolDto>> GetAllSchoolsAsync(string schoolName);
        Task<School> GetSchoolByIdAsync(Guid schoolId);
        Task<School> CreateSchoolAsync(School school);
        Task<School> UpdateSchoolAsync(School updatedSchool);
        Task<School> DeleteSchoolAsync(School school);
    }
}
