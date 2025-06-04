using SMSDataModel.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSRepository.RepositoryInterfaces
{
    public interface IClassRepository
    {
        Task<Class> CreateClass(Class newClass);
        Task<List<Class>> GetAllClasses();
        Task<Class> GetClassById(Guid id);
        Task<Class> UpdateClass(Guid id, Class updatedClass);

    }
}
