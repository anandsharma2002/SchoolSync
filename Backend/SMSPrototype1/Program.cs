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
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };

                    // ✅ Read JWT from cookie
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            Console.WriteLine($"=== JWT Message Received ===");
                            Console.WriteLine($"Request Path: {context.Request.Path}");
                            Console.WriteLine($"Request Method: {context.Request.Method}");
                            Console.WriteLine($"Cookies Count: {context.Request.Cookies.Count}");
                            
                            foreach (var cookie in context.Request.Cookies)
                            {
                                Console.WriteLine($"Cookie: {cookie.Key} = {cookie.Value?.Substring(0, Math.Min(50, cookie.Value?.Length ?? 0))}...");
                            }
                            
                            if (context.Request.Cookies.ContainsKey("auth_token"))
                            {
                                context.Token = context.Request.Cookies["auth_token"];
                                Console.WriteLine($"JWT Token found in cookie: {context.Token?.Substring(0, Math.Min(50, context.Token?.Length ?? 0))}...");
                            }
                            else
                            {
                                Console.WriteLine("No auth_token cookie found!");
                            }
                            
                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            Console.WriteLine($"=== JWT Authentication Failed ===");
                            Console.WriteLine($"Exception: {context.Exception?.Message}");
                            Console.WriteLine($"Exception Type: {context.Exception?.GetType().Name}");
                            if (context.Exception?.InnerException != null)
                            {
                                Console.WriteLine($"Inner Exception: {context.Exception.InnerException.Message}");
                            }
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            Console.WriteLine("=== JWT Token Validated Successfully ===");
                            Console.WriteLine($"User ID: {context.Principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value}");
                            Console.WriteLine($"User Name: {context.Principal?.FindFirst(ClaimTypes.Name)?.Value}");
                            return Task.CompletedTask;
                        },
                        OnChallenge = context =>
                        {
                            Console.WriteLine($"=== JWT Challenge ===");
                            Console.WriteLine($"Error: {context.Error}");
                            Console.WriteLine($"Error Description: {context.ErrorDescription}");
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
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("corspolicy", builder =>
                {
                    builder
                        .WithOrigins("http://localhost:8081", "http://localhost:3000", "http://localhost:8080") 
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
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
