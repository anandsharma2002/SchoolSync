using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;
using SchoolSync.Domain.ResponseDtos;

namespace SchoolSync.ApplicationInterfaces
{
    public interface ISchoolService
    {
        Task<IEnumerable<School>> GetAllSchoolsAsync();
        Task<List<SchoolDto>> GetAllSchoolsAsync(string schoolName);
        Task<School> GetSchoolByIdAsync(Guid schoolId);
        Task<School> CreateSchoolAsync(CreateSchoolRequestDto createSchool);
        Task<School> UpdateSchoolAsync(Guid id, CreateSchoolRequestDto updatedSchool);
        Task<School> DeleteSchoolAsync(Guid id);
    }
}
