using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SchoolSync.ApplicationInterfaces;
using SchoolSync.Domain.ApiResult;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;
using SchoolSync.Web.GlobalExceptionHandle;

namespace SchoolSync.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ITeacherService _teacherservice;
        public TeacherController(UserManager<ApplicationUser> userManager, ITeacherService teacherService)
        {
            this.userManager = userManager;
            _teacherservice = teacherService;
        }
        [HttpGet]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<IEnumerable<Teacher>>> GetAllTeachersAsync()
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException(string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)));
            }

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

            var apiResult = new ApiResult<IEnumerable<Teacher>>
            {
                Content = await _teacherservice.GetAllTeachersAsync(user.SchoolId),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpGet("{id}")]
        [Authorize]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Teacher>> GetTeacherByIdAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Teacher>
            {
                Content = await _teacherservice.GetTeacherByIdAsync(id),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Teacher>> CreateTeacherAsync([FromBody] CreateTeacherRqstDto teacherRqstDto)
        {
            var schoolIdClaim = User.FindFirst("SchoolId");
            if (schoolIdClaim == null || !Guid.TryParse(schoolIdClaim.Value, out var schoolId))
            {
                throw new UnauthorizedException("Missing or invalid SchoolId in token.");
            }

            teacherRqstDto.SchoolId = schoolId;

            var apiResult = new ApiResult<Teacher>
            {
                Content = await _teacherservice.CreateTeacherAsync(teacherRqstDto),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Teacher>> UpdateTeacherAsync([FromRoute] Guid id, [FromBody] UpdateTeacherRequestDto updateTeacherRequestDto)
        {
            var apiResult = new ApiResult<Teacher>
            {
                Content = await _teacherservice.UpdateTeacherAsync(id, updateTeacherRequestDto),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Teacher>> DeleteTeacherAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Teacher>
            {
                Content = await _teacherservice.DeleteTeacherAsync(id),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }

    }

}
