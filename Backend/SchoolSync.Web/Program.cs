using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SchoolSync.Application;
using SchoolSync.ApplicationInterfaces;
using SchoolSync.Domain.AutoMapper;
using SchoolSync.Domain.Models;
using SchoolSync.Helpers;
using SchoolSync.Infrastructure;
using SchoolSync.InfrastructureInterfaces;
using SchoolSync.Persistence;
using SchoolSync.Web.GlobalExceptionHandle;

namespace SchoolSync
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add DbContext 
            builder.Services.AddDbContext<DataContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQLConnectionString")));

            // Identity setup with ApplicationUser and Guid keys
            builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();


            // Check JWT settings before adding authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                 .AddJwtBearer(options =>
                 {
                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         ValidateIssuer = true,
                         ValidateAudience = true,
                         ValidateLifetime = true,
                         ValidateIssuerSigningKey = true,
                         ValidIssuer = builder.Configuration["Jwt:Issuer"],
                         ValidAudience = builder.Configuration["Jwt:Audience"],
                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                     };

                     options.Events = new JwtBearerEvents
                     {
                         OnMessageReceived = context =>
                         {
                             var accessToken = context.Request.Cookies["auth_token"];

                             if (!string.IsNullOrEmpty(accessToken))
                             {
                                 context.Token = accessToken;
                             }

                             return Task.CompletedTask;
                         }
                     };
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
            builder.Services.AddScoped<ISchoolService, SchoolService>();
            builder.Services.AddScoped<ISchoolClassServices, SchoolClassServices>();
            builder.Services.AddScoped<ITeacherService, TeacherService>();
            builder.Services.AddScoped<IStudentService, StudentService>();
            builder.Services.AddScoped<IAttendanceService, AttendanceService>();
            builder.Services.AddScoped<IAnnouncementService, AnnouncementService>();

            builder.Services.AddScoped<ISchoolRepository, SchoolRepository>();
            builder.Services.AddScoped<IClassRepository, ClassRepository>();
            builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();
            builder.Services.AddScoped<IStudentRepository, StudentRepository>();
            builder.Services.AddScoped<IAttendanceRepository, AttendanceRepository>();
            builder.Services.AddScoped<ITeacherAttendanceRepository, TeacherAttendanceRepository>();
            builder.Services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();

            // AutoMapper configs
            builder.Services.AddAutoMapper(typeof(SchoolAutoMapper));
            builder.Services.AddAutoMapper(typeof(SchoolClassAutoMapper));
            builder.Services.AddAutoMapper(typeof(TeacherAutomapper));
            builder.Services.AddAutoMapper(typeof(StudentAutomapper));
            builder.Services.AddAutoMapper(typeof(AttendanceAutomapper));


            // Global Exception Handler
            builder.Services.AddExceptionHandler<AppExceptionHandler>();
            builder.Services.AddProblemDetails();

            // Add controllers and swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            // CORS setup (consider restricting in production)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("corspolicy", builder =>
                {
                    builder
                        .WithOrigins("http://localhost:8080")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });



            var app = builder.Build();

            // Configure exception handling middleware
            app.UseExceptionHandler();

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
