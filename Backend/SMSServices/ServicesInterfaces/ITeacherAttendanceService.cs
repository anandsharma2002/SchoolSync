using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSServices.ServicesInterfaces
{
    public interface ITeacherAttendanceService
    {
        Task<List<TeacherAttendance>> GetAllAttendancesOfTeachersAsync();
        Task<TeacherAttendance> GetTeacherByAttendanceIdAsync(Guid teacherAttendanceid);
        Task<TeacherAttendance> CreateTeacherAttendanceAsync(CreateTeacherAttendanceDto newTeacherAttendanceRqst);
        Task<TeacherAttendance> UpdatedTeacherAttendanceAsync(Guid id, CreateTeacherAttendanceDto updatedTeacher);
        Task<TeacherAttendance> DeleteTeacherAttendanceAsync(Guid id);
    }
}
