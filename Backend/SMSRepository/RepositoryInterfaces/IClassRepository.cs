using SMSDataModel.Model;
using SMSDataModel.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSRepository.RepositoryInterfaces
{
    public interface IClassRepository
    {
        Task<List<SchoolClass>> GetAllClassesAsync();
        Task<SchoolClass> GetClassByIdAsync(Guid id);
        Task<SchoolClass> CreateClassAsync(SchoolClass newClass);
        Task<SchoolClass> UpdateClassAsync(SchoolClass updatedClass);
        Task<SchoolClass> DeleteClassAsync(SchoolClass existingClass);


    }
}
