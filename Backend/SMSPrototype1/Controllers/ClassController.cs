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
    public class ClassController : ControllerBase
    {
        private readonly ISchoolClassServices  schoolClassServices;
        public ClassController(ISchoolClassServices schoolClassServices)
        {
            this.schoolClassServices = schoolClassServices;
        }


        [HttpGet]
        public async Task<ApiResult<IEnumerable<SchoolClass>>> GetAllClassAsync()
        {

            var apiResult = new ApiResult<IEnumerable<SchoolClass>>();
            try
            {
                Guid schoolId = Guid.Parse("742bb760-efe2-4ac4-8ef7-a45819d21bef");
                apiResult.Content = await schoolClassServices.GetAllClassesAsync(schoolId);
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

        // Not now
        [HttpGet("{id}")]
        public async Task<ApiResult<SchoolClass>> GetClassByIdAsync([FromRoute]Guid id)
        {
            var apiResult = new ApiResult<SchoolClass>();
            try
            {
                apiResult.Content = await schoolClassServices.GetClassByIdAsync(id);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Class with this Id not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }

        [HttpPost]
        public async Task<ApiResult<SchoolClass>> CreateClassAsync([FromBody]CreateClassRequestDto newClass)
        {
            var apiResult = new ApiResult<SchoolClass>();
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
                apiResult.Content = await schoolClassServices.CreateClassAsync(newClass);
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
        public async Task<ApiResult<SchoolClass>> UpdateClassAsync([FromRoute] Guid id, [FromBody] UpdateClassRequestDto updatedClass)
        {
            var apiResult = new ApiResult<SchoolClass>();
            try
            {
                apiResult.Content = await schoolClassServices.UpdateClassAsync(id, updatedClass);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Class with this Id not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }

        [HttpDelete("{id}")]
        public async Task<ApiResult<SchoolClass>> DeleteClassAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<SchoolClass>();
            try
            {
                apiResult.Content = await schoolClassServices.DeleteClassAsync(id);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Class with this Id not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }

        }

    }
}
