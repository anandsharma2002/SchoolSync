using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolSync.ApplicationInterfaces;
using SchoolSync.Domain.ApiResult;
using SchoolSync.Domain.Models;
using SchoolSync.Domain.RequestDtos;
using SchoolSync.Domain.ResponseDtos;
using SchoolSync.Web.GlobalExceptionHandle;


namespace SchoolSync.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolService schoolService;
        public SchoolController(ISchoolService schoolService)
        {
            this.schoolService = schoolService;
        }



        [HttpGet]
        //[Authorize(Roles = "SuperAdmin")]
        public async Task<ApiResult<IEnumerable<School>>> GetAllSchoolsAsync()
        {

            throw new BadRequestException("New Error");
            var apiResult = new ApiResult<IEnumerable<School>>
            {
                Content = await schoolService.GetAllSchoolsAsync(),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }
        [HttpGet("search")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ApiResult<IEnumerable<SchoolDto>>> GetAllSchoolsAsync([FromQuery] string schoolName)
        {
            var apiResult = new ApiResult<IEnumerable<SchoolDto>>
            {
                Content = await schoolService.GetAllSchoolsAsync(schoolName),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }



        [HttpGet("getbyId/{schoolId}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ApiResult<School>> GetSchoolByIdAsync([FromRoute] Guid schoolId)
        {
            var apiResult = new ApiResult<School>
            {
                Content = await schoolService.GetSchoolByIdAsync(schoolId),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }

        [HttpPost("CreateSchoolAsync")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ApiResult<School>> CreateSchoolAsync([FromBody] CreateSchoolRequestDto createSchoolRequest)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException(string.Join(" | ", ModelState.Values
                    .SelectMany(x => x.Errors)
                    .Select(e => e.ErrorMessage)));
            }

            var apiResult = new ApiResult<School>
            {
                Content = await schoolService.CreateSchoolAsync(createSchoolRequest),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }


        [HttpPut("UpdateSchool/{schoolId}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ApiResult<School>> UpdateSchool([FromRoute] Guid schoolId, [FromBody] CreateSchoolRequestDto updateSchool)
        {
            var apiResult = new ApiResult<School>
            {
                Content = await schoolService.UpdateSchoolAsync(schoolId, updateSchool),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }

        [HttpDelete("{schoolId}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ApiResult<School>> DeleteSchool([FromRoute] Guid schoolId)
        {
            var apiResult = new ApiResult<School>
            {
                Content = await schoolService.DeleteSchoolAsync(schoolId),
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK
            };
            return apiResult;
        }


    }
}
