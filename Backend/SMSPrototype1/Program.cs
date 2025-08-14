using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SMSDataContext.Data;
using SMSDataContext.Helpers;
using SMSDataModel.Model.AutoMapper;
using SMSDataModel.Model.Models;
using SMSRepository.Repository;
using SMSRepository.RepositoryInterfaces;
using SMSServices.Services;
using SMSServices.ServicesInterfaces;
using System.Text;
using System.Threading.Tasks;

namespace SMSPrototype1
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add DbContext 
            builder.Services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Identity setup with ApplicationUser and Guid keys
            builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();


            // Check JWT settings before adding authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                 .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuer = true,
                     ValidateAudience = true,
                     ValidateLifetime = true,
                     ValidateIssuerSigningKey = true,
                     ValidIssuer = builder.Configuration["Jwt:Issuer"],
                     ValidAudience = builder.Configuration["Jwt:Audience"],
                     IssuerSigningKey = new SymmetricSecurityKey(
                         Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                 });

           
            // Swagger setup with JWT bearer auth
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "School Sync",
                    Version = "v1"
                });

                options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    BearerFormat = "Jwt",
                    In = ParameterLocation.Header,
                    Description = "Enter JWT Bearer token **_only_**"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = JwtBearerDefaults.AuthenticationScheme
                            },
                            Scheme = "bearer",
                            Name = JwtBearerDefaults.AuthenticationScheme,
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
            });
            builder.Services.AddAuthorization();
            // Register your services & repositories
            builder.Services.AddTransient<ISchoolService, SchoolService>();
            builder.Services.AddTransient<ISchoolClassServices, SchoolClassServices>();
            builder.Services.AddTransient<ITeacherService, TeacherService>();
            builder.Services.AddTransient<IStudentService, StudentService>();
            builder.Services.AddTransient<IAttendanceService, AttendanceService>();
            builder.Services.AddTransient<IAnnouncementService, AnnouncementService>();

            builder.Services.AddTransient<ISchoolRepository, SchoolRepository>();
            builder.Services.AddTransient<IClassRepository, ClassRepository>();
            builder.Services.AddTransient<ITeacherRepository, TeacherRepository>();
            builder.Services.AddTransient<IStudentRepository, StudentRepository>();
            builder.Services.AddTransient<IAttendanceRepository, AttendanceRepository>();
            builder.Services.AddTransient<ITeacherAttendanceRepository, TeacherAttendanceRepository>();
            builder.Services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();

            // AutoMapper configs
            builder.Services.AddAutoMapper(typeof(SchoolAutoMapper));
            builder.Services.AddAutoMapper(typeof(SchoolClassAutoMapper));
            builder.Services.AddAutoMapper(typeof(TeacherAutomapper));
            builder.Services.AddAutoMapper(typeof(StudentAutomapper));
            builder.Services.AddAutoMapper(typeof(AttendanceAutomapper));

            // Add controllers and swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            // CORS setup (consider restricting in production)
            builder.Services.AddCors(policy =>
            {
                policy.AddPolicy("corspolicy", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Seed Roles (make sure SeedData is implemented properly)
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                await SeedData.SeedRoles(services);
            }

            app.UseCors("corspolicy");

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
