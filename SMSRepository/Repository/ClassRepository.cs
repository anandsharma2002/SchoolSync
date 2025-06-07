using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SMSDataContext.Data;
using SMSDataModel.Model;
using SMSDataModel.Model.RequestDtos;
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
        public async Task<Class> CreateClass(Class newClass)
        {
            var result = await _context.Classes.AddAsync(newClass);
            await _context.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<List<Class>> GetAllClasses()
        {
            var result = await _context.Classes.Include(s => s.School).ToListAsync();
            return result;
        }
        public async Task<Class> GetClassById(Guid id)
        {
            var result = await _context.Classes.Include(s=> s.School).FirstOrDefaultAsync(s=> s.ClassId==id);
            return result;
        }
        public async Task<Class> UpdateClass(Guid id, Class updatedClass)
        {
            var existingClass = await _context.Classes.FindAsync(id);
            existingClass.ClassName = updatedClass.ClassName;
            existingClass.SchoolId = updatedClass.SchoolId;
            _context.Classes.Update(existingClass);
            return existingClass;
        }
        public async Task DeleteClass(Class existingClass)
        {
            _context.Classes.Remove(existingClass);
            await _context.SaveChangesAsync();
        }
    }
}

