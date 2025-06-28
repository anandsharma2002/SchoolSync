using Microsoft.EntityFrameworkCore;
using SMSDataContext.Data;
using SMSDataModel.Model.Models;
using SMSRepository.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSRepository.Repository
{
    public class StudentRepository: IStudentRepository
    {
        private readonly DataContext _context;
        public StudentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Student>> GetAllStudentAsync()
        {
            return await _context.Students.Include("School").Include("Class").ToListAsync();
        }
        public async Task<Student> GetStudentByIdAsync(Guid studentId)
        {
            var existingStudent = await _context.Students.Include(s => s.School).Include(s => s.Class).FirstOrDefaultAsync(s => s.StudentId == studentId);
            return existingStudent;
        }
        public async Task<Student> CreateStudentAsync(Student student)
        {
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();
            return student;
        }
        public async Task<Student> UpdateStudentAsync(Student updatedStudent)
        {
            var result = _context.Students.Update(updatedStudent);
            await _context.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<Student> DeleteStudentAsync(Student student)
        {
            var result = _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return result.Entity;
        }
    }
}
