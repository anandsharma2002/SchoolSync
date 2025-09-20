using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.ApplicationInterfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetAllStudentAsync(Guid schoolId);
        Task<Student> GetStudentByIdAsync(Guid studentId);
        Task<IEnumerable<Student>> GetStudentByClassIdAsync(Guid classId);
        Task<Student> CreateStudentAsync(CreateStudentRqstDto createStudent);
        Task<Student> UpdateStudentAsync(Guid id, UpdateStudentRequestDto updateStudentRequestDto);
        Task<Student> DeleteStudentAsync(Guid id);
    }
}
