using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model.ApiResult;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSRepository.RepositoryInterfaces;
using SMSServices.ServicesInterfaces;
using System.Net;

namespace SMSPrototype1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherservice;
        public TeacherController(ITeacherService teacherService)
        {
            _teacherservice = teacherService;
        }
        [HttpGet]
        public async Task <ApiResult<IEnumerable<Teacher>>> GetAllTeachersAsync()
        {
            var apiResult = new ApiResult<IEnumerable<Teacher>>();
            if (!ModelState.IsValid)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return apiResult;
            }
            try
            {
                apiResult.Content = await _teacherservice.GetAllTeachersAsync();
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch(Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = System.Net.HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
        [HttpGet("{id}")]
        public async Task <ApiResult<Teacher>> GetTeacherByIdAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Teacher>();
            try
            {
                apiResult.Content = await _teacherservice.GetTeacherByIdAsync(id);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Id for this Teacher not found"
               ? HttpStatusCode.NotFound
               : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
        [HttpPost]
        public async Task<ApiResult<Teacher>> CreateTeacherAsync([FromBody] CreateTeacherRqstDto teacherRqstDto)
        {
            var apiResult = new ApiResult<Teacher>();
            try
            {
                apiResult.Content = await _teacherservice.CreateTeacherAsync(teacherRqstDto);
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
        [HttpPut("{id}")]
        public async Task<ApiResult<Teacher>> UpdateTeacherAsync([FromRoute] Guid id, [FromBody] CreateTeacherRqstDto teacherRqstDto)
        {
            var apiResult = new ApiResult<Teacher>();
            try
            {
                apiResult.Content = await _teacherservice.UpdateTeacherAsync(id, teacherRqstDto);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Id for this Teacher not found"
                 ? HttpStatusCode.NotFound
                 : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }

        [HttpDelete("{id}")]
        public async Task<ApiResult<Teacher>> DeleteTeacherAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Teacher>();
            try
            {
                apiResult.Content = await _teacherservice.DeleteTeacherAsync(id);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Id for this Teacher not found"
                ? HttpStatusCode.NotFound
                : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
      }

}
