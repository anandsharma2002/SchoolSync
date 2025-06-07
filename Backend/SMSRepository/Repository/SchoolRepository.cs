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
using SMSDataModel.Model.RequestDtos;
using SMSDataModel.Model.Models;

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
        public async Task<School> GetSchoolById(Guid schoolId)
        {
            var existingSchool = await _Context.Schools.FindAsync(schoolId);
            return existingSchool;
        }

        public async Task<School> CreateSchool(School school)
        {
            await _Context.Schools.AddAsync(school);
            await _Context.SaveChangesAsync();
            return school;
        }

        public async Task<School> UpdateSchool(School updatedSchool)
        {
            var result =  _Context.Schools.Update(updatedSchool);
            await _Context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<School> DeleteSchool(School school)
        {
            var result = _Context.Schools.Remove(school);
            await _Context.SaveChangesAsync();
            return result.Entity;
        }

    }
}
