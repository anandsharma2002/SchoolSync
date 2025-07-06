using SMSDataModel.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSRepository.RepositoryInterfaces
{
    public interface ITeacherAttendanceRepository
    {
        Task<List<TeacherAttendance>> GetAllAttendancesOfTeachersAsync();
        Task<TeacherAttendance> GetTeacherByAttendanceIdAsync(Guid teacherAttendanceid);
        Task<TeacherAttendance> CreateTeacherAttendanceAsync(TeacherAttendance newTeacherAttendanceRqst);
        Task<TeacherAttendance> UpdateTeacherAttendandanceAsync(TeacherAttendance updatedTeacher);
        Task<TeacherAttendance> DeleteTeacherAttendanceAsync(TeacherAttendance existingTeacherAttendance);
    }
}
