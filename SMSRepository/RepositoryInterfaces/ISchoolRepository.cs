using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMSDataModel.Model;
using SMSDataModel.Model.RequestDtos;

namespace SMSRepository.RepositoryInterfaces
{
    public interface ISchoolRepository
    {
        Task<IEnumerable<School>> GetAllSchoolsAsync();
        Task<School> CreateSchool(School reqClass);
        Task<School> GetSchoolById(Guid SchoolId);
        Task<School> UpdateSchool(School school, CreateSchoolRequestDto schoolReq);
        Task DeleteSchool(School school);
    }
}
