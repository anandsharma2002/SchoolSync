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
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext (DbContextOptions<DataContext> options ) : base (options) { }
        public DbSet<SchoolRole> SchoolRoles { get; set; }
        public DbSet<UserSchoolRole> UserSchoolRoles { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<Parents> Parents { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<SchoolClass> Classes { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Teacher> TeacherSubject { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //base.OnModelCreating(builder);

            //// Jab School delete ho, Students auto-delete NA ho
            //builder.Entity<Student>()
            //    .HasOne(s => s.School)
            //    .WithMany()
            //    .HasForeignKey(s => s.SchoolId)
            //    .OnDelete(DeleteBehavior.Restrict);  // Cascade hata diya

            //// Class delete hone par Students delete ho jaayein (agar aap chahein)
            //builder.Entity<Student>()
            //    .HasOne(s => s.Class)
            //    .WithMany()
            //    .HasForeignKey(s => s.ClassId)
            //    .OnDelete(DeleteBehavior.Cascade);
        }



    }
}
