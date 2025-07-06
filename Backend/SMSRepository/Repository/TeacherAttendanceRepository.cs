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
    public class TeacherAttendanceRepository : ITeacherAttendanceRepository
    {
        private readonly DataContext _context;
        public TeacherAttendanceRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<TeacherAttendance>> GetAllAttendancesOfTeachersAsync()
        {
            var result = await _context.TeachersAttendance.ToListAsync();
            return result;
        }
        public async Task<TeacherAttendance> GetTeacherByAttendanceIdAsync(Guid teacherAttendanceid)
        {
            var result = await _context.TeachersAttendance.FirstOrDefaultAsync(s => s.TeacherAttendanceId == teacherAttendanceid);
            return result;
        }
        public async Task<TeacherAttendance> CreateTeacherAttendanceAsync(TeacherAttendance newTeacherAttendanceRqst)
        {
            var result = await _context.TeachersAttendance.AddAsync(newTeacherAttendanceRqst);
            await _context.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<TeacherAttendance> UpdateTeacherAttendandanceAsync(TeacherAttendance updatedTeacher)
        {
            var result = _context.TeachersAttendance.Update(updatedTeacher);
            await _context.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<TeacherAttendance> DeleteTeacherAttendanceAsync(TeacherAttendance existingTeacherAttendance)
        {
            var result = _context.TeachersAttendance.Remove(existingTeacherAttendance);
            await _context.SaveChangesAsync();
            return existingTeacherAttendance;
        }
    }
}
