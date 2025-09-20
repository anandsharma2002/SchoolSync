using AutoMapper;
using SchoolSync.ApplicationInterfaces;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;
using SchoolSync.InfrastructureInterfaces;

namespace SchoolSync.Application
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper mapper;
        public StudentService(IStudentRepository studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<Student>> GetAllStudentAsync(Guid schoolId)
        {
            return await _studentRepository.GetAllStudentAsync(schoolId);
        }


        public async Task<Student> GetStudentByIdAsync(Guid studentId)
        {
            var result = await _studentRepository.GetStudentByIdAsync(studentId);
            if (result != null)
            {
                return result;
            }
            throw new Exception("Student not found");
        }


        public async Task<IEnumerable<Student>> GetStudentByClassIdAsync(Guid classtId)
        {
            var result = await _studentRepository.GetStudentByClassIdAsync(classtId);
            if (result != null)
            {
                return result;
            }
            throw new Exception("Students with class Id not found");
        }


        public async Task<Student> CreateStudentAsync(CreateStudentRqstDto createStudent)
        {
            var newStudent = mapper.Map<Student>(createStudent);
            var result = await _studentRepository.CreateStudentAsync(newStudent);
            return result;
        }
        public async Task<Student> UpdateStudentAsync(Guid id, UpdateStudentRequestDto updateStudentRequestDto)
        {
            var existingStudent = await _studentRepository.GetStudentByIdAsync(id);
            if (existingStudent != null)
            {
                existingStudent = mapper.Map(updateStudentRequestDto, existingStudent);
                var result = await _studentRepository.UpdateStudentAsync(existingStudent);
                return result;
            }
            throw new Exception("Student with this Id not found");
        }
        public async Task<Student> DeleteStudentAsync(Guid id)
        {

            var student = await _studentRepository.GetStudentByIdAsync(id);
            if (student != null)
            {
                var result = await _studentRepository.DeleteStudentAsync(student);
                return result;
            }
            throw new Exception("Student with this ID not found");
        }
    }
}
