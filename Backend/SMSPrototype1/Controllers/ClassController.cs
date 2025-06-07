using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model;
using SMSDataModel.Model.RequestDtos;
using SMSRepository.Repository;
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
        public async Task<ActionResult> CreateClass(CreateClassRequestDto newClass)
        {
            var newClas = new Class
            { 
                ClassId = Guid.NewGuid(),
                SchoolId = newClass.SchoolId,
                ClassName = newClass.ClassName
            };
            var result = await _classRepository.CreateClass(newClas);
            return Ok(result);
        }
        [HttpGet]
        public async Task<ActionResult> GetAllClass()
        {
            var result = await _classRepository.GetAllClasses();
            return Ok(result);

        }
        [HttpGet("{id}")]
        public async Task<ActionResult> GetClassById(Guid id)
        {
            var result = await _classRepository.GetClassById(id);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClass(Guid id, CreateClassRequestDto updatedClass)
        {
            var updatedClas = new Class { 
              ClassName = updatedClass.ClassName,
              SchoolId= updatedClass.SchoolId
            };
            var result = await _classRepository.UpdateClass(id, updatedClas);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClass(Guid id)
        {
            var exist = await _classRepository.GetClassById(id);
            if (exist != null)
            {
                await _classRepository.DeleteClass(exist);
                return Ok("Class Deleted Successfully");
            }
            return NotFound("Class with id not found");

        }

    }
}
