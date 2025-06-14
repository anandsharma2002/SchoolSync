using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SMSDataContext.Data;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSRepository.RepositoryInterfaces;
using SMSServices.ServicesInterfaces;

namespace SMSServices.Services
{
    public class SchoolClassServices : ISchoolClassServices
    {

        private readonly IClassRepository classRepository;
        private readonly IMapper mapper;
        public SchoolClassServices(IClassRepository classRepository, IMapper mapper)
        {
            this.classRepository = classRepository;
            this.mapper = mapper;
        }
        public async Task<List<SchoolClass>> GetAllClassesAsync()
        {
            var result = await classRepository.GetAllClassesAsync();
            return result;
        }
        public async Task<SchoolClass> GetClassByIdAsync(Guid id)
        {
            var result = await classRepository.GetClassByIdAsync(id);
            if(result != null)
            {
                return result;
            }
            throw new Exception("Class with this Id not found");
        }
        public async Task<SchoolClass> CreateClassAsync(CreateClassRequestDto newClass)
        {
            var new1Class = mapper.Map<SchoolClass>(newClass);
            //var schoolClass = new SchoolClass
            //{
            //    ClassName = newClass.ClassName,
            //    SchoolId = newClass.SchoolId,
            //};
            var result = await classRepository.CreateClassAsync(new1Class);
            return result;
        }
        public async Task<SchoolClass> UpdateClassAsync(Guid id, CreateClassRequestDto updatedClass)
        {
            var schoolClass = await classRepository.GetClassByIdAsync(id);
            if (schoolClass != null)
            {
                mapper.Map(updatedClass, schoolClass);
                //schoolClass.ClassName = updatedClass.ClassName;
                //schoolClass.SchoolId = updatedClass.SchoolId;
                var result = await classRepository.UpdateClassAsync(schoolClass);
                return result;
            }
            throw new Exception("Class with this Id not found!");
        }
        public async Task<SchoolClass> DeleteClassAsync(Guid id)
        {

            var schoolClass = await classRepository.GetClassByIdAsync(id);
            if (schoolClass != null)
            {
                var result = await classRepository.DeleteClassAsync(schoolClass);
                return result;
            }
            throw new Exception("Class with this Id not found !");
        }
    }
}
