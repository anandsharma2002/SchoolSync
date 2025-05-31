using SMSDataContext.Data;
using SMSRepository.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMSRepository.Repository
{
   public class ClassRepository: IClassRepository
    {
        private readonly DataContext _context;
        public ClassRepository(DataContext context)
        {
            _context = context;
        }

    }
}
