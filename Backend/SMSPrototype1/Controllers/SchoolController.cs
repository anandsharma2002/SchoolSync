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

        [HttpGet]
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


        [HttpGet("{id}")]
        public async Task<ApiResult<School>> GetSchoolByIdAsync([FromRoute] Guid id)
        {

            var apiResult = new ApiResult<School>();
            try
            {
                apiResult.Content = await schoolService.GetSchoolByIdAsync(id);
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

        [HttpPost]
        public async Task<ApiResult<School>> CreateSchoolAsync([FromBody] CreateSchoolRequestDto createSchoolRequest)
        {

            var apiResult = new ApiResult<School>();
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
        

        [HttpPut("{id}")]
        public async Task<ApiResult<School>> UpdateSchool([FromRoute] Guid id, [FromBody] CreateSchoolRequestDto updateSchool)
        {

            var apiResult = new ApiResult<School>();
            try
            {
                apiResult.Content = await schoolService.UpdateSchoolAsync(id, updateSchool);
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
        [HttpDelete("{id}")]
        public async Task<ApiResult<School>> DeleteSchool([FromRoute] Guid id)
        {

            var apiResult = new ApiResult<School>();
            try
            {
                apiResult.Content = await schoolService.DeleteSchoolAsync(id);
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
