using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
using System.Security.Claims;

namespace SMSPrototype1.Controllers
{
    [ApiController]
    
    [Route("api/[controller]")]
    public class ClassController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ISchoolClassServices  schoolClassServices;
        public ClassController(UserManager<ApplicationUser> userManager, ISchoolClassServices schoolClassServices)
        {
            this.userManager = userManager;
            this.schoolClassServices = schoolClassServices;
        }


        [HttpGet]
        [Authorize(Roles = "Admin,Principal,SchoolIncharge")]
        public async Task<ApiResult<IEnumerable<SchoolClass>>> GetAllClassAsync()
        {
            var apiResult = new ApiResult<IEnumerable<SchoolClass>>();

            try
            {
                // 1. Get current user ID
                if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
                {
                    return SetError(apiResult, "Invalid or missing user ID.", HttpStatusCode.Unauthorized);
                }

                // 2. Retrieve the user
                var user = await userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    return SetError(apiResult, "User not found.", HttpStatusCode.NotFound);
                }

                // 3. Ensure SchoolId exists
                if (user.SchoolId == null)
                {
                    return SetError(apiResult, "User does not have a SchoolId assigned.", HttpStatusCode.BadRequest);
                }

                // 4. Retrieve classes for user's school
                var classes = await schoolClassServices.GetAllClassesAsync(user.SchoolId.Value);

                apiResult.Content = classes;
                apiResult.IsSuccess = true;
                apiResult.StatusCode = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                return SetError(apiResult, ex.Message, HttpStatusCode.BadRequest);
            }

            return apiResult;
        }

       

        // Not now
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Principal,SchoolIncharge")]
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
        [Authorize(Roles = "Admin,Principal,SchoolIncharge")]
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
        [Authorize(Roles = "Admin,Principal,SchoolIncharge")]
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
        [Authorize(Roles = "Admin,Principal,SchoolIncharge")]
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
        private ApiResult<T> SetError<T>(ApiResult<T> result, string message, HttpStatusCode statusCode)
        {
            result.IsSuccess = false;
            result.StatusCode = statusCode;
            result.ErrorMessage = message;
            return result;
        }

    }
}
