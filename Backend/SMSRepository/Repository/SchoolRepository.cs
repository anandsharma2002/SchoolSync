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

namespace SMSRepository.Repository
{
    public class SchoolRepository : ISchoolRepository
    {
        public readonly DataContext _Context;
        public SchoolRepository(DataContext context)
        {
            _Context = context;
        }
        public async Task<School> CreateSchool(School school) {
            await _Context.Schools.AddAsync(school);
            await _Context.SaveChangesAsync();
            return school;
        }


        public async Task<IEnumerable<School>> GetAllSchoolsAsync()
        {
            return await _Context.Schools.ToListAsync();
        }

        public async Task<School> GetSchoolById(Guid SchoolId)
        {
            var existingSchool = await _Context.Schools.FindAsync(SchoolId);
            if(existingSchool != null)
            {
                return existingSchool;
            }
            return null;
        }

        public async Task<School> UpdateSchool(School school, CreateSchoolRequestDto schoolReq)
        {
            school.SchoolName = schoolReq.SchoolName;
            school.SchoolEmail = schoolReq.SchoolEmail;
            school.Address = schoolReq.Address;
            school.PhoneNumber = schoolReq.PhoneNumber;
            school.City = schoolReq.City;
            school.State = schoolReq.State;
            school.PinCode = schoolReq.PinCode;
            var result =  _Context.Schools.Update(school);
            await _Context.SaveChangesAsync();
            return school;
        }
        public async Task DeleteSchool(School school)
        {
             _Context.Schools.Remove(school);
            await _Context.SaveChangesAsync();
        }

    }
}
