namespace SchoolSync.Domain.Model.Models
{
    public class ErrorResponse
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public int StatusCode { get; set; }
    }
}
