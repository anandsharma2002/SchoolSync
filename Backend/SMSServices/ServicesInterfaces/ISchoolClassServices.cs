using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;

namespace SMSServices.ServicesInterfaces
{
    public interface ISchoolClassServices
    {
        Task<List<SchoolClass>> GetAllClassesAsync();
        Task<SchoolClass> GetClassByIdAsync(Guid id);
        Task<SchoolClass> CreateClassAsync(CreateClassRequestDto newClass);
        Task<SchoolClass> UpdateClassAsync(Guid id, CreateClassRequestDto updatedClass);
        Task<SchoolClass> DeleteClassAsync(Guid id);
    }
}
