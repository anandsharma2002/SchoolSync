using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SMSDataModel.Model.Models;


namespace SMSDataContext.Data
{
    public class DataContext : DbContext
    {
        public DataContext (DbContextOptions<DataContext> options ) : base (options) { }

        public DbSet<School> Schools { get; set; }
        public DbSet<SchoolClass> Classes { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<TeacherAttendance> TeachersAttendance { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }



    }
}
