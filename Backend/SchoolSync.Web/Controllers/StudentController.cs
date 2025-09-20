using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SchoolSync.ApplicationInterfaces;
using SchoolSync.Domain.ApiResult;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;
using SchoolSync.Web.GlobalExceptionHandle;
//using System.Web.Http;

namespace SchoolSync.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IStudentService _studentService;
        public StudentController(UserManager<ApplicationUser> userManager, IStudentService studentService)
        {
            this.userManager = userManager;
            _studentService = studentService;
        }

        [HttpGet]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge,Teacher")]
        public async Task<ApiResult<IEnumerable<Student>>> GetAllStudentAsync()
        {
            if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
            {
                throw new UnauthorizedException("Invalid or missing user ID.");
            }

            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }

            if (user.SchoolId == null)
            {
                throw new BadRequestException("User does not have a SchoolId assigned.");
            }

            var apiResult = new ApiResult<IEnumerable<Student>>
            {
                Content = await _studentService.GetAllStudentAsync(user.SchoolId),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Student>> GetStudentByIdAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Student>
            {
                Content = await _studentService.GetStudentByIdAsync(id),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }



        [HttpGet("GetStudentByClassIdAsync/{classId}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge,Teacher")]
        public async Task<ApiResult<IEnumerable<Student>>> GetStudentByClassIdAsync([FromRoute] Guid classId)
        {
            var apiResult = new ApiResult<IEnumerable<Student>>
            {
                Content = await _studentService.GetStudentByClassIdAsync(classId),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }


        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Student>> CreateStudentAsync([FromBody] CreateStudentRqstDto createStudentRqstDto)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException(string.Join(" | ", ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(e => e.ErrorMessage)));
            }

            var apiResult = new ApiResult<Student>
            {
                Content = await _studentService.CreateStudentAsync(createStudentRqstDto),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Student>> UpdateStudentAsync([FromRoute] Guid id, [FromBody] UpdateStudentRequestDto updateStudentRequestDto)
        {
            var apiResult = new ApiResult<Student>
            {
                Content = await _studentService.UpdateStudentAsync(id, updateStudentRequestDto),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Student>> DeleteStudentAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Student>
            {
                Content = await _studentService.DeleteStudentAsync(id),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }

    }
}
