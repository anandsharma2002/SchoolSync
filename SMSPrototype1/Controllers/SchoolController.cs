using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSDataModel.Model;
using SMSDataModel.Model.RequestDtos;
using SMSRepository.RepositoryInterfaces;
using SMSServices.ServicesInterfaces;


namespace SMSPrototype1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolRepository _schoolRepository;
        public SchoolController(ISchoolRepository schoolRepository)
        {
            this._schoolRepository = schoolRepository;
        }
        [HttpPost]
        public async Task<ActionResult> CreateSchool(CreateSchoolRequestDto createSchoolRequest)
        {
            var newSchool = new School{
                SchoolId = Guid.NewGuid(),
                SchoolName= createSchoolRequest.SchoolName,
                SchoolEmail= createSchoolRequest.SchoolEmail,
                PhoneNumber = createSchoolRequest.PhoneNumber,
                Address= createSchoolRequest.Address,
                City = createSchoolRequest.City,
                State = createSchoolRequest.State,
                PinCode = createSchoolRequest.PinCode
            };
            var result = await _schoolRepository.CreateSchool(newSchool);
            return Ok(new
            {
                Message = "School Created successfully",
                Data = newSchool
            });    
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<School>>> GetAllSchoolsAsync()
        {
            var result = await _schoolRepository.GetAllSchoolsAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<School>> GetSchoolById( Guid id)
        {
            var result = await _schoolRepository.GetSchoolById(id);
            if(result != null)
            {
                return Ok(result);
            }
            return NotFound("School with this id not found");
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<School>> UpdateSchool(Guid id, CreateSchoolRequestDto school)
        {
            var exist = await _schoolRepository.GetSchoolById(id);
            if(exist != null)
            {
                var result = await _schoolRepository.UpdateSchool(exist, school);
                return Ok(new
                {
                    Message = "School updated Successfully",
                    Data= result
                });
            }
            else
            { 
               return( NotFound("School with this Id not found"));
            }
            
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSchool(Guid id)
        {
            var exist = await _schoolRepository.GetSchoolById(id);
            if (exist != null)
            {
                await _schoolRepository.DeleteSchool(exist);
                return Ok("School Deleted Successfully");
            }
            return NotFound("School with id not found");

        }


    }
}
