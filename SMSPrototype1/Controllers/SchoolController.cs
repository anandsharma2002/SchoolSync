using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSServices.ServicesInterfaces;


namespace SMSPrototype1.Controllers
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
    }
}
