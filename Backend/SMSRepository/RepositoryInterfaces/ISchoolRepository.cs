using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMSDataModel.Model;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;

namespace SMSRepository.RepositoryInterfaces
{
    public interface ISchoolRepository
    {
        Task<IEnumerable<School>> GetAllSchoolsAsync();
        Task<School> GetSchoolById(Guid schoolId);
        Task<School> CreateSchool(School school);
        Task<School> UpdateSchool(School updatedSchool);
        Task<School> DeleteSchool(School school);
    }
}
