using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SMSRepository.Repository;
//using SMS
using SMSRepository.RepositoryInterfaces;
using SMSDataModel.Model.AutoMapper;
using SMSServices.ServicesInterfaces;
using SMSServices.Services;
using SMSDataContext.Data;
//using SMSDataModel.Model.AutoMapper;

namespace SMSPrototype1
{

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            //builder.Services.AddDbContext<DataContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQLConnectionString")));
            //var connectionString = builder.Configuration.GetConnectionString("PostgresSQLConnectionString")
            //    ?? throw new InvalidOperationException("Invalid!! PostgresSQLConnectionString not found");

            builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("PostgresSQLConnectionString")));

            // Services Transient
            builder.Services.AddTransient<ISchoolService, SchoolService>();
            builder.Services.AddTransient<ISchoolClassServices, SchoolClassServices>();
            builder.Services.AddTransient<ITeacherService, TeacherService>();
            builder.Services.AddTransient<IStudentService, StudentService>();
            builder.Services.AddTransient<IAttendanceService, AttendanceService>();
            builder.Services.AddTransient<ITeacherAttendanceService, TeacherAttendanceService>();



            // Repositories Transient
            builder.Services.AddTransient<ISchoolRepository, SchoolRepository>();
            builder.Services.AddTransient<IClassRepository, ClassRepository>();
            builder.Services.AddTransient<ITeacherRepository, TeacherRepository>();
            builder.Services.AddTransient<IStudentRepository, StudentRepository>();
            builder.Services.AddTransient<IAttendanceRepository, AttendanceRepository>();
            builder.Services.AddTransient<ITeacherAttendanceRepository, TeacherAttendanceRepository>();

            // AutoMapper
            builder.Services.AddAutoMapper(typeof(SchoolAutoMapper));
            builder.Services.AddAutoMapper(typeof(SchoolClassAutoMapper));
            builder.Services.AddAutoMapper(typeof(TeacherAutomapper));
            builder.Services.AddAutoMapper(typeof(StudentAutomapper));
            builder.Services.AddAutoMapper(typeof(AttendanceAutomapper));


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            // cors
            builder.Services.AddCors(x => x.AddPolicy("corspolicy", build =>
            {
                build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
            }));


            var app = builder.Build();                                                                                                                                                                                           

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            

            // cors
            app.UseCors("corspolicy");


            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
