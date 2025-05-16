using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SMSDataModel.Model;


namespace SMSDataContext.Data
{
    public class DataContext : IdentityDbContext<ApplicationAuthentication>
    {
        public DataContext (DbContextOptions<DataContext> options ) : base (options) { }

        public DbSet<ApplicationAuthentication> User {  get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var SchoolRoleId = "2bf62c77-519a-4851-bd7a-a9cc2d5ff116";
            var TeacherRoleId = "04595992-2d28-4505-a702-15e131850da8";
            var StudentRoleId = "ee6c2884-2f39-4f82-a8ee-58f12888b458";


            var UserRoles = new List<IdentityRole>()
            {
                new IdentityRole
                {
                    Id = SchoolRoleId,
                    ConcurrencyStamp = SchoolRoleId,
                    Name = "School",
                    NormalizedName = "School".ToUpper()
                },
                new IdentityRole
                {
                    Id = TeacherRoleId,
                    ConcurrencyStamp = TeacherRoleId,
                    Name = "Teacher",
                    NormalizedName = "Teacher".ToUpper()
                },
                new IdentityRole
                {
                    Id = StudentRoleId,
                    ConcurrencyStamp = StudentRoleId,
                    Name = "Student",
                    NormalizedName = "Student".ToUpper()
                }
            };
            builder.Entity<IdentityRole>().HasData(UserRoles);

        }



    }
}
