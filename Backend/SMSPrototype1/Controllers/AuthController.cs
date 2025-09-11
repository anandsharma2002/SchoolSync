using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SMSDataModel.Model.Models;
using SMSDataModel.Model.RequestDtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SMSPrototype1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }


        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found");

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                id = user.Id,
                username = user.UserName,
                email = user.Email,
                roles = roles
            });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                SchoolId = model.SchoolId,
                CreatedDate = DateOnly.FromDateTime(DateTime.UtcNow)
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    isSuccess = false,
                    errorMessage = string.Join("; ", result.Errors.Select(e => e.Description))
                });
            }


            await _userManager.AddToRoleAsync(user, model.Role);

            
            return Ok(new
            {
                isSuccess = true,
                message = "Registration successful!"
            });
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Invalid credentials");

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            
            if (user.SchoolId != null)
            {
                authClaims.Add(new Claim("SchoolId", user.SchoolId.ToString()));
            }

            authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var jwtKey = _configuration["Jwt:Key"];
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.UtcNow.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            /* Used when working with swagger */

            //return Ok(new
            //{
            //    token = new JwtSecurityTokenHandler().WriteToken(token),
            //    expiration = token.ValidTo
            //});

            /* Used for frontend only */
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            Response.Cookies.Append("auth_token", tokenString, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None, // if you're using cross-origin (localhost:8080 <-> 7266)
                Expires = token.ValidTo
            });

            return Ok(new { message = "Login successful" });

        }
        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            // Remove the cookie
            Response.Cookies.Delete("auth_token");

            // Optionally, sign out the identity (if using Identity cookies)
            _signInManager.SignOutAsync();

            return Ok(new { message = "Logout successful" });
        }

    }

}
