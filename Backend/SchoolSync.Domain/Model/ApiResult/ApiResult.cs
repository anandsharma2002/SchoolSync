using System.Net;

namespace SchoolSync.Domain.ApiResult
{
    public class ApiResult<T>
    {
        public T Content { get; set; }
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public HttpStatusCode StatusCode { get; set; }
    }
}
