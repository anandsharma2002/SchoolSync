using System.Net;
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
    [ApiController]
    [Route("api/[controller]")]
    public class ClassController : ControllerBase
    {
        private readonly ISchoolClassServices schoolClassServices;
        private readonly UserManager<ApplicationUser> userManager;
        public ClassController(ISchoolClassServices schoolClassServices, UserManager<ApplicationUser> userManager)
        {
            this.schoolClassServices = schoolClassServices;
            this.userManager = userManager;
        }

        [HttpGet]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<IEnumerable<SchoolClass>>> GetAllClassAsync()
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

            var classes = await schoolClassServices.GetAllClassesAsync(user.SchoolId);

            var apiResult = new ApiResult<IEnumerable<SchoolClass>>
            {
                Content = classes,
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK
            };
            return apiResult;
        }


        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<SchoolClass>> GetClassByIdAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<SchoolClass>
            {
                Content = await schoolClassServices.GetClassByIdAsync(id),
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK
            };
            return apiResult;
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<SchoolClass>> CreateClassAsync([FromBody] CreateClassRequestDto newClass)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException(string.Join(" | ", ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(e => e.ErrorMessage)));
            }

            var schoolIdClaim = User.FindFirst("SchoolId");
            if (schoolIdClaim == null || !Guid.TryParse(schoolIdClaim.Value, out var schoolId))
            {
                throw new UnauthorizedException("Missing or invalid SchoolId in token.");
            }

            newClass.SchoolId = schoolId;

            var apiResult = new ApiResult<SchoolClass>
            {
                Content = await schoolClassServices.CreateClassAsync(newClass),
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK
            };
            return apiResult;
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<SchoolClass>> UpdateClassAsync([FromRoute] Guid id, [FromBody] UpdateClassRequestDto updatedClass)
        {
            var apiResult = new ApiResult<SchoolClass>
            {
                Content = await schoolClassServices.UpdateClassAsync(id, updatedClass),
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK
            };
            return apiResult;
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<SchoolClass>> DeleteClassAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<SchoolClass>
            {
                Content = await schoolClassServices.DeleteClassAsync(id),
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK
            };
            return apiResult;
        }

    }
}
