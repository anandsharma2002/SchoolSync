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
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole<Guid>> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
        }


        [HttpGet("test-cookies")]
        public IActionResult TestCookies()
        {
            var cookies = Request.Cookies;
            var cookieInfo = new Dictionary<string, string>();
            
            foreach (var cookie in cookies)
            {
                cookieInfo[cookie.Key] = cookie.Value?.Substring(0, Math.Min(50, cookie.Value?.Length ?? 0)) + "...";
            }
            
            return Ok(new
            {
                message = "Cookie test endpoint",
                cookies = cookieInfo,
                hasAuthToken = cookies.ContainsKey("auth_token"),
                authTokenValue = cookies.ContainsKey("auth_token") ? cookies["auth_token"]?.Substring(0, Math.Min(50, cookies["auth_token"]?.Length ?? 0)) + "..." : "Not found"
            });
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                // Debug: Check if user is authenticated
                if (!User.Identity.IsAuthenticated)
                {
                    return Unauthorized("User is not authenticated");
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                Console.WriteLine($"User ID from token: {userId}");

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token");
                }

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
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetCurrentUser: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
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

            // ✅ Only assign role if it exists
            if (!string.IsNullOrEmpty(model.Role))
            {
                var roleExists = await _roleManager.RoleExistsAsync(model.Role);
                if (!roleExists)
                {
                    return BadRequest(new
                    {
                        isSuccess = false,
                        errorMessage = $"Role '{model.Role}' does not exist."
                    });
                }

                await _userManager.AddToRoleAsync(user, model.Role);
            }

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
            var jwtIssuer = _configuration["Jwt:Issuer"];
            var jwtAudience = _configuration["Jwt:Audience"];
            
            Console.WriteLine($"=== JWT Configuration ===");
            Console.WriteLine($"Key: {jwtKey?.Substring(0, Math.Min(10, jwtKey?.Length ?? 0))}...");
            Console.WriteLine($"Issuer: {jwtIssuer}");
            Console.WriteLine($"Audience: {jwtAudience}");
            
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
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
                // Development settings
                Secure = false,
                SameSite = SameSiteMode.Lax,   // Use Lax for same-site requests
                Path = "/",                    // Explicitly set path
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
