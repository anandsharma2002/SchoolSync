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
        Task<List<Class>> GetAllClassesAsync();
        Task<Class> GetClassByIdAsync(Guid id);
        Task<Class> CreateClassAsync(Class newClass);
        Task<Class> UpdateClassAsync(Class updatedClass);
        Task<Class> DeleteClassAsync(Class existingClass);


    }
}
