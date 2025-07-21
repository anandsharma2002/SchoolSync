using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SMSDataContext.Data;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using SMSServices.ServicesInterfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SMSServices.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;

        public AuthService(UserManager<ApplicationUser> userManager, IConfiguration configuration,DataContext context )
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }
        public async Task<string> RegisterAsync(RegisterDto model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return "User already exists!";
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                Role = model.Role
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return "User creation failed!";

            await _userManager.AddToRoleAsync(user, model.Role);

            if (model.Role != "SuperAdmin")
            {
                if (!model.SchoolId.HasValue)
                    return "SchoolId is required for this role.";

                var schoolRole = await _context.SchoolRoles.FirstOrDefaultAsync(r => r.RoleName == model.Role && r.SchoolId == model.SchoolId.Value);

                if (schoolRole == null)
                {
                    schoolRole = new SchoolRole
                    {
                        RoleName = model.Role,
                        SchoolId = model.SchoolId.Value
                    };
                    await _context.SchoolRoles.AddAsync(schoolRole);
                    await _context.SaveChangesAsync();
                }

                _context.UserSchoolRoles.Add(new UserSchoolRole
                {
                    UserId = user.UserId,
                    SchoolId = model.SchoolId.Value,
                    SchoolRoleid = schoolRole.Id
                });
                await _context.SaveChangesAsync();
            }
            return "User Registered successfully!";
        }
        public async Task<string> LoginAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                Guid? schoolId = null;

                if (user.Role != "SuperAdmin")
                {
                    var userSchoolRole = await _context.UserSchoolRoles
                        .FirstOrDefaultAsync(usr => usr.UserId == user.UserId);

                    if (userSchoolRole == null)
                        return "User does not have a school role assigned.";

                    schoolId = userSchoolRole.SchoolId;
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtSettings = _configuration.GetSection("JWTSettings").Get<JWTSettings>();
                var key = Encoding.ASCII.GetBytes(jwtSettings.Key);

                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

                if (schoolId.HasValue)
                {
                    claims.Add(new Claim("SchoolId", schoolId.ToString()));
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddMinutes(jwtSettings.DurationInMinutes),
                    Issuer = jwtSettings.Issuer,
                    Audience = jwtSettings.Audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            return "Invalid email or password!";
        }
    }
}

