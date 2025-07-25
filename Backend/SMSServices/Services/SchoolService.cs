﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SMSDataContext.Data;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSRepository.RepositoryInterfaces;
using SMSServices.ServicesInterfaces;

namespace SMSServices.Services
{
    public class SchoolService : ISchoolService
    {
        private readonly ISchoolRepository schoolRepository;
        private readonly IMapper mapper;

        public SchoolService(ISchoolRepository schoolRepository, IMapper mapper)
        {
            this.schoolRepository = schoolRepository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<School>> GetAllSchoolsAsync()
        {
            return await schoolRepository.GetAllSchoolsAsync();
        }
        public async Task<School> GetSchoolByIdAsync(Guid schoolId)
        {
            var result = await schoolRepository.GetSchoolByIdAsync(schoolId);
            if (result != null)
            {
                return result;
            }
            throw new Exception("School not found!");
        }

        public async Task<School> CreateSchoolAsync(CreateSchoolRequestDto createSchool)
        {
            var newSchool = mapper.Map<School>(createSchool);
            var existingSchool = await schoolRepository.SchoolExistsAsync(newSchool);
            if (!existingSchool)
            {
                var result = await schoolRepository.CreateSchoolAsync(newSchool);
                return result;
            }
            throw new Exception("School with this name, email and pin code already exists");
        }

        public async Task<School> UpdateSchoolAsync(Guid id, CreateSchoolRequestDto updatedSchool)
        {
            var school = await schoolRepository.GetSchoolByIdAsync(id);
            if (school != null)
            {
                school.RegistrationNumber = updatedSchool.RegistrationNumber;
                school.Name = updatedSchool.Name;
                school.Email = updatedSchool.Email;
                school.Phone = updatedSchool.Phone;
                school.Address = updatedSchool.Address;
                school.City = updatedSchool.City;
                school.State = updatedSchool.State;
                school.PinCode = updatedSchool.PinCode;

                var result = await schoolRepository.UpdateSchoolAsync(school);
                return result;
            }
            throw new Exception("School not found!");
        }

        public async Task<School> DeleteSchoolAsync(Guid id)
        {
            var school = await schoolRepository.GetSchoolByIdAsync(id);
            if (school != null)
            {
                var result = await schoolRepository.DeleteSchoolAsync(school);
                return result;
            }
            throw new Exception("School not found!");
        }

    }
}
