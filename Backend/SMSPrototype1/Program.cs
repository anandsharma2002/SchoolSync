using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SMSDataContext.Data;
using SMSDataModel.Model.AutoMapper;
using SMSDataModel.Model.Models;
using SMSRepository.Repository;
using SMSRepository.RepositoryInterfaces;
using SMSServices.Services;
using SMSServices.ServicesInterfaces;
using System.Runtime.CompilerServices;
using System.Text;

namespace SMSPrototype1
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // JWT Settings
            builder.Services.Configure<JWTSettings>(
                builder.Configuration.GetSection("JWTSettings"));

            var jwtSettings = builder.Configuration.GetSection("JWTSettings").Get<JWTSettings>();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Key);

            // DB Context
            builder.Services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQLConnectionString")));

            // Identity
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

            // JWT Auth
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
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    RoleClaimType = "role"
                };
            });

            builder.Services.AddAuthorization();

            // Services
            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<ISchoolService, SchoolService>();
            builder.Services.AddTransient<ISchoolClassServices, SchoolClassServices>();
            builder.Services.AddTransient<ITeacherService, TeacherService>();
            builder.Services.AddTransient<IStudentService, StudentService>();
            builder.Services.AddTransient<IAttendanceService, AttendanceService>();
            builder.Services.AddTransient<IAnnouncementService, AnnouncementService>();

            // Repositories
            builder.Services.AddTransient<ISchoolRepository, SchoolRepository>();
            builder.Services.AddTransient<IClassRepository, ClassRepository>();
            builder.Services.AddTransient<ITeacherRepository, TeacherRepository>();
            builder.Services.AddTransient<IStudentRepository, StudentRepository>();
            builder.Services.AddTransient<IAttendanceRepository, AttendanceRepository>();
            builder.Services.AddScoped<ITeacherAttendanceRepository, TeacherAttendanceRepository>();
            builder.Services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();

            // AutoMapper
            builder.Services.AddAutoMapper(typeof(SchoolAutoMapper));
            builder.Services.AddAutoMapper(typeof(SchoolClassAutoMapper));
            builder.Services.AddAutoMapper(typeof(TeacherAutomapper));
            builder.Services.AddAutoMapper(typeof(StudentAutomapper));
            builder.Services.AddAutoMapper(typeof(AttendanceAutomapper));

            // CORS
            builder.Services.AddCors(x => x.AddPolicy("corspolicy", build =>
            {
                build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            // Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

    // ?? Add this part for JWT Authorization in Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your valid token.\nExample: Bearer abcdefgh12345"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});


            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("corspolicy");

            app.UseAuthentication(); 
            app.UseAuthorization();

            app.MapControllers();
            using (var scope = app.Services.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                await DataSeeder.SeedRolesAsync(roleManager);
            }
            app.Run();
        }
    }
}
