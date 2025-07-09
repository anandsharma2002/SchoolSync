using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model.ApiResult;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSServices.ServicesInterfaces;
using System.Net;

namespace SMSPrototype1.Controllers
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
        public async Task<ApiResult<IEnumerable<TeacherAttendance>>> GetAllAttendancesOfTeachersAsync()
        {

            var apiResult = new ApiResult<IEnumerable<TeacherAttendance>>();
            try
            {
                apiResult.Content = await _teacherAttendanceService.GetAllAttendancesOfTeachersAsync();
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = System.Net.HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
        [HttpGet("GetTeacherByAttendanceId/{teacherAttendanceid}")]
        public async Task<ApiResult<TeacherAttendance>> GetTeacherByAttendanceIdAsync([FromRoute] Guid teacherAttendanceid)
        {
            var apiResult = new ApiResult<TeacherAttendance>();
            try
            {
                apiResult.Content = await _teacherAttendanceService.GetTeacherByAttendanceIdAsync(teacherAttendanceid);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Attendance with this ID not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
        [HttpPost("createTeacherAttendance")]
        public async Task<ApiResult<TeacherAttendance>> CreateAttendanceAsync([FromBody] CreateTeacherAttendanceDto newAttendance)
        {
            var apiResult = new ApiResult<TeacherAttendance>();
            try
            {
                apiResult.Content = await _teacherAttendanceService.CreateTeacherAttendanceAsync(newAttendance);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = System.Net.HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
        [HttpPut("{teacherId}")]
        public async Task<ApiResult<TeacherAttendance>> UpdateTeacherAttendandanceAsync([FromRoute] Guid teacherId, [FromBody] CreateTeacherAttendanceDto updatedTeacherAttendance)
        {
            var apiResult = new ApiResult<TeacherAttendance>();
            try
            {
                apiResult.Content = await _teacherAttendanceService.UpdatedTeacherAttendanceAsync(teacherId, updatedTeacherAttendance);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Attendance with this ID not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
        [HttpDelete("{attendanceId}")]
        public async Task<ApiResult<TeacherAttendance>> DeleteTeacherAttendanceAsync([FromRoute] Guid attendanceId)
        {
            var apiResult = new ApiResult<TeacherAttendance>();
            try
            {
                apiResult.Content = await _teacherAttendanceService.DeleteTeacherAttendanceAsync(attendanceId);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Attendance with this ID not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }

        }
    }
}
