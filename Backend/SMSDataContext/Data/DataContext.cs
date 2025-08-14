using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SMSDataModel.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;


namespace SMSDataContext.Data
{
   public class DataContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Announcement> Announcements { get; set; }
      
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<Parents> Parents { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<SchoolClass> Classes { get; set; }
        public DbSet<Student> Students { get; set ; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Teacher> TeacherSubject { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Attendance>()
            .Property(a => a.Status)
            .HasConversion<string>();

             builder.Entity<Student>()
               .Property(s => s.Gender)
               .HasConversion<string>();


            builder.Entity<School>()
               .HasOne(s => s.User)
               .WithMany()
               .HasForeignKey(s => s.UserId)
               .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationUser>()
               .HasOne(u => u.School)
               .WithMany()
               .HasForeignKey(u => u.SchoolId)
               .OnDelete(DeleteBehavior.Restrict);



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
