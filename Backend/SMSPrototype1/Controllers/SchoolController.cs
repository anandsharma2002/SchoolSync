using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model;
using SMSDataModel.Model.ApiResult;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSRepository.Repository;
using SMSRepository.RepositoryInterfaces;
using SMSServices.Services;
using SMSServices.ServicesInterfaces;
using System.Net;


namespace SMSPrototype1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolService  schoolService;
        public SchoolController(ISchoolService schoolService)
        {
            this.schoolService = schoolService;
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("GetAllSchoolsAsync")]
        public async Task<ApiResult<IEnumerable<School>>> GetAllSchoolsAsync()
        {
            var apiResult = new ApiResult<IEnumerable<School>>();
            try
            {
                apiResult.Content = await schoolService.GetAllSchoolsAsync();
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

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("GetSchoolByIdAsync/{schoolId}")]
        public async Task<ApiResult<School>> GetSchoolByIdAsync([FromRoute] Guid schoolId)
        {

            var apiResult = new ApiResult<School>();
            try
            {
                apiResult.Content = await schoolService.GetSchoolByIdAsync(schoolId);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "School with this ID not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("CreateSchoolAsync")]
        public async Task<ApiResult<School>> CreateSchoolAsync([FromBody] CreateSchoolRequestDto createSchoolRequest)
        {

            var apiResult = new ApiResult<School>();
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
                apiResult.Content = await schoolService.CreateSchoolAsync(createSchoolRequest);
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

        [Authorize(Roles = "SuperAdmin")]
        [HttpPut("UpdateSchool/{schoolId}")]
        public async Task<ApiResult<School>> UpdateSchool([FromRoute] Guid schoolId, [FromBody] CreateSchoolRequestDto updateSchool)
        {

            var apiResult = new ApiResult<School>();
            try
            {
                apiResult.Content = await schoolService.UpdateSchoolAsync(schoolId, updateSchool);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "School with this ID not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }  
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{schoolId}")]
        public async Task<ApiResult<School>> DeleteSchool([FromRoute] Guid schoolId)
        {

            var apiResult = new ApiResult<School>();
            try
            {
                apiResult.Content = await schoolService.DeleteSchoolAsync(schoolId);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "School with this ID not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }

        }


    }
}
