using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model.ApiResult;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSServices.Services;
using SMSServices.ServicesInterfaces;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace SMSPrototype1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
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
                Guid schoolId = Guid.Parse("742bb760-efe2-4ac4-8ef7-a45819d21bef"); ; // Replace with actual school ID retrieval logic
                apiResult.Content = await _studentService.GetAllStudentAsync(schoolId);
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

            if (!ModelState.IsValid)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = string.Join(" | ", ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(e => e.ErrorMessage));
                return apiResult;
            }
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
        public async Task<ApiResult<Student>> UpdateStudentAsync([FromRoute] Guid id, [FromBody] UpdateStudentRequestDto updateStudentRequestDto )
        {

            var apiResult = new ApiResult<Student>();
            try
            {
                apiResult.Content = await _studentService.UpdateStudentAsync(id, updateStudentRequestDto);
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
