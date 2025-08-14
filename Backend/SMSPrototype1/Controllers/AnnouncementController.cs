﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model.ApiResult;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSServices.Services;
using SMSServices.ServicesInterfaces;
using System.Net;
using System.Security.Claims;

namespace SMSPrototype1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IAnnouncementService _announcementService;
        public AnnouncementController(UserManager<ApplicationUser> userManager,IAnnouncementService announcementService)
        {
            this.userManager = userManager;
            _announcementService = announcementService;
        }
        [HttpGet]
        public async Task<ApiResult<IEnumerable<Announcement>>> GetAllAnnouncemetsAsync()
        {

            var apiResult = new ApiResult<IEnumerable<Announcement>>();
            try
            {
                if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
                {
                    return SetError(apiResult, "Invalid or missing user ID.", HttpStatusCode.Unauthorized);
                }

                
                var user = await userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    return SetError(apiResult, "User not found.", HttpStatusCode.NotFound);
                }

                
                if (user.SchoolId == null)
                {
                    return SetError(apiResult, "User does not have a SchoolId assigned.", HttpStatusCode.BadRequest);
                }

               
                apiResult.Content = await _announcementService.GetAllAnnouncemetsAsync(user.SchoolId.Value);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                return SetError(apiResult, ex.Message, HttpStatusCode.BadRequest);
            }

        }
        [HttpGet("GetAnnouncementByIdAsync/{AnnoucementId}")]
        public async Task<ApiResult<Announcement>> GetAnnouncementByIdAsync([FromRoute] Guid AnnoucementId)
        {

            var apiResult = new ApiResult<Announcement>();
            try
            {
                apiResult.Content = await _announcementService.GetAnnouncementByIdAsync(AnnoucementId);
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

        [HttpPost("CreateAnnouncement")]
        public async Task<ApiResult<Announcement>> CreateAnnouncement([FromBody] CreateAnnouncementRqstDto createAnnouncementRqst)
        {

            var apiResult = new ApiResult<Announcement>();
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
                apiResult.Content = await _announcementService.CreateAnnouncementAsync(createAnnouncementRqst);
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
        public async Task<ApiResult<Announcement>> UpdateAnnouncementAsync([FromRoute] Guid id, [FromBody] UpdateAnnouncementRequestDto updateAnnouncementRequestDto)
        {
            var apiResult = new ApiResult<Announcement>();
            try
            {
                apiResult.Content = await _announcementService.UpdateAnnouncementAsync(id, updateAnnouncementRequestDto);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Attendance with this ID not found"
                   ? HttpStatusCode.NotFound
                   : HttpStatusCode.BadRequest;
                apiResult.ErrorMessage = ex.Message;
                return apiResult;
            }
        }
        [HttpDelete("{id}")]
        public async Task<ApiResult<Announcement>> DeleteAnnouncementAsync([FromRoute] Guid id)
        {
            var apiResult = new ApiResult<Announcement>();
            try
            {
                apiResult.Content = await _announcementService.DeleteAnnouncementAsync(id);
                apiResult.IsSuccess = true;
                apiResult.StatusCode = System.Net.HttpStatusCode.OK;
                return apiResult;
            }
            catch (Exception ex)
            {
                apiResult.IsSuccess = false;
                apiResult.StatusCode = ex.Message == "Attendance with this ID not found"
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
