using SchoolSync.Domain.Models;

namespace SchoolSync.InfrastructureInterfaces
{
    public interface IStudentRepository
    {
        Task<IEnumerable<Student>> GetAllStudentAsync(Guid schoolId);
        Task<Student> GetStudentByIdAsync(Guid studentId);
        Task<IEnumerable<Student>> GetStudentByClassIdAsync(Guid classId);
        Task<Student> CreateStudentAsync(Student student);
        Task<Student> UpdateStudentAsync(Student updatedStudent);
        Task<Student> DeleteStudentAsync(Student student);
    }
}
