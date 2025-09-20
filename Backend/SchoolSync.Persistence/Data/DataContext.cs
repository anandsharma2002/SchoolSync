using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchoolSync.Domain.Models;

namespace SchoolSync.Persistence
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
        public DbSet<TeacherSubject> TeacherSubjects { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Attendance>()
                .Property(a => a.Status)
                .HasConversion<string>();

            builder.Entity<Student>()
                .Property(s => s.Gender)
                .HasConversion<string>();

            // Unique indexes / constraints
            builder.Entity<School>()
                .HasIndex(s => s.RegistrationNumber)
                .IsUnique();

            builder.Entity<Student>()
                .HasIndex(s => s.SRNumber)
                .IsUnique();

            builder.Entity<Student>()
                .HasIndex(s => new { s.ClassId, s.RollNumber })
                .IsUnique();

            builder.Entity<Teacher>()
                .HasIndex(t => new { t.SchoolId, t.Email })
                .IsUnique();

            // TeacherSubject relationships and unique constraint
            builder.Entity<TeacherSubject>()
                .HasOne(ts => ts.Teacher)
                .WithMany()
                .HasForeignKey(ts => ts.TeacherId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<TeacherSubject>()
                .HasOne(ts => ts.Subject)
                .WithMany()
                .HasForeignKey(ts => ts.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<TeacherSubject>()
                .HasOne(ts => ts.SchoolClass)
                .WithMany()
                .HasForeignKey(ts => ts.SchoolClassId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<TeacherSubject>()
                .HasIndex(ts => new { ts.TeacherId, ts.SubjectId, ts.SchoolClassId })
                .IsUnique();
        }
    }
}
