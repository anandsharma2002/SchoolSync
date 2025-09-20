using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolSync.ApplicationInterfaces;
using SchoolSync.Domain.ApiResult;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;

namespace SchoolSync.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherAttendanceController : ControllerBase
    {
        private readonly ITeacherAttendanceService _teacherAttendanceService;
        public TeacherAttendanceController(ITeacherAttendanceService teacherAttendanceService)
        {
            _teacherAttendanceService = teacherAttendanceService;
        }

        [HttpGet("GetTeacherAttendance")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<IEnumerable<Attendance>>> GetAllAttendancesOfTeachersAsync()
        {
            var apiResult = new ApiResult<IEnumerable<Attendance>>
            {
                Content = await _teacherAttendanceService.GetAllAttendancesOfTeachersAsync(),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpGet("GetTeacherByAttendanceId/{teacherAttendanceid}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Attendance>> GetTeacherByAttendanceIdAsync([FromRoute] Guid teacherAttendanceid)
        {
            var apiResult = new ApiResult<Attendance>
            {
                Content = await _teacherAttendanceService.GetTeacherByAttendanceIdAsync(teacherAttendanceid),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpPost("createTeacherAttendance")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Attendance>> CreateAttendanceAsync([FromBody] CreateTeacherAttendanceDto newAttendance)
        {
            var apiResult = new ApiResult<Attendance>
            {
                Content = await _teacherAttendanceService.CreateTeacherAttendanceAsync(newAttendance),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpPut("{teacherId}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Attendance>> UpdateTeacherAttendandanceAsync([FromRoute] Guid teacherId, [FromBody] CreateTeacherAttendanceDto updatedTeacherAttendance)
        {
            var apiResult = new ApiResult<Attendance>
            {
                Content = await _teacherAttendanceService.UpdatedTeacherAttendanceAsync(teacherId, updatedTeacherAttendance),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpDelete("{attendanceId}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Attendance>> DeleteTeacherAttendanceAsync([FromRoute] Guid attendanceId)
        {
            var apiResult = new ApiResult<Attendance>
            {
                Content = await _teacherAttendanceService.DeleteTeacherAttendanceAsync(attendanceId),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
    }
}
