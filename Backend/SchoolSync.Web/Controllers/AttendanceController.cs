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
    [Authorize]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _attendanceService;
        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpGet]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge,Teacher")]
        public async Task<ApiResult<IEnumerable<Attendance>>> GetAllAttendancesOfStudentsAsync()
        {
            var apiResult = new ApiResult<IEnumerable<Attendance>>
            {
                Content = await _attendanceService.GetAllAttendancesOfStudentsAsync(),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge,Teacher")]
        public async Task<ApiResult<Attendance>> GetAttendanceByIdAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Attendance>
            {
                Content = await _attendanceService.GetAttendanceByIdAsync(id),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge,Teacher")]
        public async Task<ApiResult<Attendance>> CreateAttendanceAsync([FromBody] CreateAttendanceRqstDto newAttendance)
        {
            var apiResult = new ApiResult<Attendance>
            {
                Content = await _attendanceService.CreateAttendanceAsync(newAttendance),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge,Teacher")]
        public async Task<ApiResult<Attendance>> UpdateAttendandanceAsync([FromRoute] Guid id, [FromBody] CreateAttendanceRqstDto updatedAttendance)
        {
            var apiResult = new ApiResult<Attendance>
            {
                Content = await _attendanceService.updatedAttendanceAsync(id, updatedAttendance),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge,Teacher")]
        public async Task<ApiResult<Attendance>> DeleteAttendanceAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Attendance>
            {
                Content = await _attendanceService.DeleteAttendanceAsync(id),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }

    }
}
