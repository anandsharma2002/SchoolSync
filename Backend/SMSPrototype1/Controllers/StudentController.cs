using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model.ApiResult;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSServices.Services;
using SMSServices.ServicesInterfaces;
using System.Net;

namespace SMSPrototype1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }
        [HttpGet]
        public async Task<ApiResult<IEnumerable<Student>>> GetAllStudentAsync()
        {
            var apiResult = new ApiResult<IEnumerable<Student>>();
            try
            {
                apiResult.Content = await _studentService.GetAllStudentAsync();
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
        [HttpGet("{id}")]
        public async Task<ApiResult<Student>> GetStudentByIdAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Student>();
            try
            {
                apiResult.Content = await _studentService.GetStudentByIdAsync(id);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Student with this ID not found"
               ? HttpStatusCode.NotFound
               : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }

        }



        [HttpGet("GetStudentByClassIdAsync/{classId}")]
        public async Task<ApiResult<IEnumerable<Student>>> GetStudentByClassIdAsync([FromRoute] Guid classId)
        {
            var apiResult = new ApiResult<IEnumerable<Student>>();
            try
            {
                apiResult.Content = await _studentService.GetStudentByClassIdAsync(classId);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Student with this ID not found"
               ? HttpStatusCode.NotFound
               : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }

        }








        [HttpPost]
        public async Task<ApiResult<Student>> CreateStudentAsync([FromBody] CreateStudentRqstDto createStudentRqstDto)
        {
            var apiResult = new ApiResult<Student>();
            try
            {
                apiResult.Content = await _studentService.CreateStudentAsync(createStudentRqstDto);
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
        public async Task<ApiResult<Student>> UpdateStudentAsync([FromRoute] Guid id, [FromBody] CreateStudentRqstDto updateStudent)
        {

            var apiResult = new ApiResult<Student>();
            try
            {
                apiResult.Content = await _studentService.UpdateStudentAsync(id, updateStudent);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Student with this ID not found"
                ? HttpStatusCode.NotFound
                : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }

        }
        [HttpDelete("{id}")]
        public async Task<ApiResult<Student>> DeleteStudentAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Student>();
            try
            {
                apiResult.Content = await _studentService.DeleteStudentAsync(id);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Id for this teacher not Found"
               ? HttpStatusCode.NotFound
               : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }

        }

    }
}
