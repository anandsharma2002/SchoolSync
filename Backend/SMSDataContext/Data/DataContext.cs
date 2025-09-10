using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SMSDataModel.Model.Models;

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
        public DbSet<Student> Students { get; set; }
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

            // ✅ One-to-many: School → Users
            builder.Entity<School>()
                .HasMany(s => s.Users)
                .WithOne(u => u.School)
                .HasForeignKey(u => u.SchoolId)
                .OnDelete(DeleteBehavior.Cascade);

            //// If you want School delete to NOT remove students automatically
            //builder.Entity<Student>()
            //    .HasOne(s => s.School)
            //    .WithMany()
            //    .HasForeignKey(s => s.SchoolId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //// If you want Class delete to remove Students
            //builder.Entity<Student>()
            //    .HasOne(s => s.Class)
            //    .WithMany()
            //    .HasForeignKey(s => s.ClassId)
            //    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
