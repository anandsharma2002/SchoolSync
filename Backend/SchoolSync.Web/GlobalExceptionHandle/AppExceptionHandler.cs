using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using SchoolSync.Domain.Model.Models;

namespace SchoolSync.Web.GlobalExceptionHandle
{
    public class AppExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<AppExceptionHandler> _logger;
        private readonly IWebHostEnvironment _environment;

        public AppExceptionHandler(ILogger<AppExceptionHandler> logger, IWebHostEnvironment environment)
        {
            _logger = logger;
            _environment = environment;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);

            var response = CreateErrorResponse(exception);

            httpContext.Response.StatusCode = response.StatusCode;
            httpContext.Response.ContentType = "application/json";

            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };

            await httpContext.Response.WriteAsJsonAsync(response, jsonOptions, cancellationToken);
            return true;
        }

        private ErrorResponse CreateErrorResponse(Exception exception)
        {
            return exception switch
            {

                ArgumentNullException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = $"Required parameter is missing: {ex.ParamName}",
                    StatusCode = StatusCodes.Status400BadRequest
                },
                ArgumentException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = $"Invalid argument: {ex.Message}",
                    StatusCode = StatusCodes.Status400BadRequest
                },
                UnauthorizedAccessException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "Access denied. You don't have permission to perform this action.",
                    StatusCode = StatusCodes.Status401Unauthorized
                },
                KeyNotFoundException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message.Contains("not found") ? ex.Message : "The requested resource was not found.",
                    StatusCode = StatusCodes.Status404NotFound
                },
                InvalidOperationException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message,
                    StatusCode = StatusCodes.Status400BadRequest
                },
                NotImplementedException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "This feature is not yet implemented.",
                    StatusCode = StatusCodes.Status501NotImplemented
                },
                TimeoutException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "The operation timed out. Please try again.",
                    StatusCode = StatusCodes.Status408RequestTimeout
                },
                HttpRequestException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "External service is currently unavailable. Please try again later.",
                    StatusCode = StatusCodes.Status503ServiceUnavailable
                },
                DbUpdateConcurrencyException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "The data has been modified by another user. Please refresh and try again.",
                    StatusCode = StatusCodes.Status409Conflict
                },
                DbUpdateException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "Database operation failed. Please check your data and try again.",
                    StatusCode = StatusCodes.Status500InternalServerError
                },
                ValidationException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message,
                    StatusCode = StatusCodes.Status400BadRequest
                },
                FormatException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "Invalid data format provided.",
                    StatusCode = StatusCodes.Status400BadRequest
                },
                OverflowException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "The value provided is too large or too small.",
                    StatusCode = StatusCodes.Status400BadRequest
                },
                FileNotFoundException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "The requested file was not found.",
                    StatusCode = StatusCodes.Status404NotFound
                },
                DirectoryNotFoundException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = "The requested directory was not found.",
                    StatusCode = StatusCodes.Status404NotFound
                },
                UnauthorizedException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message,
                    StatusCode = StatusCodes.Status401Unauthorized
                },
                ForbiddenException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message,
                    StatusCode = StatusCodes.Status403Forbidden
                },
                NotFoundException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message,
                    StatusCode = StatusCodes.Status404NotFound
                },
                ConflictException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message,
                    StatusCode = StatusCodes.Status409Conflict
                },
                BadRequestException ex => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message,
                    StatusCode = StatusCodes.Status400BadRequest
                },
                _ => new ErrorResponse
                {
                    IsSuccess = false,
                    ErrorMessage = _environment.IsDevelopment()
                        ? exception.Message
                        : "An unexpected error occurred. Please try again later.",
                    StatusCode = StatusCodes.Status500InternalServerError
                }
            };
        }
    }

    // Custom exception classes for better error handling
    public class UnauthorizedException : Exception
    {
        public UnauthorizedException(string message) : base(message) { }
    }

    public class ForbiddenException : Exception
    {
        public ForbiddenException(string message) : base(message) { }
    }

    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message) { }
    }

    public class ConflictException : Exception
    {
        public ConflictException(string message) : base(message) { }
    }

    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message) { }
    }

    public class ValidationException : Exception
    {
        public ValidationException(string message) : base(message) { }
    }
}
