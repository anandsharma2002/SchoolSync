using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query.Internal;
using SMSDataContext.Data;
using SMSDataModel.Model;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SMSRepository.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;

namespace SMSRepository.Repository
{
    public class SchoolRepository : ISchoolRepository
    {
        public readonly DataContext _Context;
        public SchoolRepository(DataContext context)
        {
            _Context = context;
        }

        public async Task<IEnumerable<School>> GetAllSchoolsAsync()
        {
            return await _Context.Schools.ToListAsync();
        }



    }
}
