using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model;
using SMSRepository.RepositoryInterfaces;

namespace SMSPrototype1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassRepository _classRepository;
        public ClassController(IClassRepository classRepository)
        {
            this._classRepository = classRepository;
        }
        [HttpPost]
        public async ActionResult CreateClass([FromBody]Class Class)
        {
                //var result = await _classRepository
        }
    }
}
