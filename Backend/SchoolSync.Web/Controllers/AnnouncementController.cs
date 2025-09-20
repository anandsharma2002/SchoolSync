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
    public class AnnouncementController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IAnnouncementService _announcementService;
        public AnnouncementController(UserManager<ApplicationUser> userManager, IAnnouncementService announcementService)
        {
            this.userManager = userManager;
            _announcementService = announcementService;
        }
        [HttpGet]
        [Authorize]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<IEnumerable<Announcement>>> GetAllAnnouncemetsAsync()
        {
            var schoolId = GetSchoolIdFromClaims();
            var apiResult = new ApiResult<IEnumerable<Announcement>>
            {
                Content = await _announcementService.GetAllAnnouncemetsAsync(schoolId.Value),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpGet("GetAnnouncementByIdAsync/{AnnoucementId}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Announcement>> GetAnnouncementByIdAsync([FromRoute] Guid AnnoucementId)
        {
            var apiResult = new ApiResult<Announcement>
            {
                Content = await _announcementService.GetAnnouncementByIdAsync(AnnoucementId),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }

        [HttpPost("CreateAnnouncement")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Announcement>> CreateAnnouncement([FromBody] CreateAnnouncementRqstDto createAnnouncementRqst)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException(string.Join(" | ", ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(e => e.ErrorMessage)));
            }

            var schoolId = GetSchoolIdFromClaims();
            if (schoolId == null)
                throw new UnauthorizedException("Invalid or missing SchoolId in token.");

            createAnnouncementRqst.SchoolId = schoolId.Value;

            var apiResult = new ApiResult<Announcement>
            {
                Content = await _announcementService.CreateAnnouncementAsync(createAnnouncementRqst),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Announcement>> UpdateAnnouncementAsync([FromRoute] Guid id, [FromBody] UpdateAnnouncementRequestDto updateAnnouncementRequestDto)
        {
            var apiResult = new ApiResult<Announcement>
            {
                Content = await _announcementService.UpdateAnnouncementAsync(id, updateAnnouncementRequestDto),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin,Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<Announcement>> DeleteAnnouncementAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Announcement>
            {
                Content = await _announcementService.DeleteAnnouncementAsync(id),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        private Guid? GetSchoolIdFromClaims()
        {
            var schoolIdClaim = User.FindFirst("SchoolId")?.Value;

            if (Guid.TryParse(schoolIdClaim, out var schoolId))
            {
                return schoolId;
            }
            return null;
        }

    }
}
