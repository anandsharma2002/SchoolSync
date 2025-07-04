using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;

namespace SMSServices.ServicesInterfaces
{
    public interface ISchoolService
    {
        Task<IEnumerable<School>> GetAllSchoolsAsync();
        Task<School> GetSchoolByIdAsync(Guid schoolId);
        Task<School> CreateSchoolAsync(CreateSchoolRequestDto createSchool);
        Task<School> UpdateSchoolAsync(Guid id, CreateSchoolRequestDto updatedSchool);
        Task<School> DeleteSchoolAsync(Guid id);
    }
}
