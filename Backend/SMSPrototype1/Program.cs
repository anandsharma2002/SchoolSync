using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SMSDataContext.Data;
using SMSRepository.Repository;
//using SMS
using SMSRepository.RepositoryInterfaces;
using SMSDataModel.Model.AutoMapper;
using SMSServices.ServicesInterfaces;
using SMSServices.Services;
//using SMSDataModel.Model.AutoMapper;

namespace SMSPrototype1
{

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddDbContext<DataContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQLConnectionString")));


            // Services Transient
            builder.Services.AddTransient<ISchoolService, SchoolService>();
            builder.Services.AddTransient<ISchoolClassServices, SchoolClassServices>();



            // Repositories Transient
            builder.Services.AddTransient<ISchoolRepository, SchoolRepository>();
            builder.Services.AddTransient<IClassRepository, ClassRepository>();

            // AutoMapper
            builder.Services.AddAutoMapper(typeof(SchoolAutoMapper));
            builder.Services.AddAutoMapper(typeof(SchoolClassAutoMapper));


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
