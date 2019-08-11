using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using webAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;  // provides API for managing users
        private SignInManager<ApplicationUser> _signInManager;  // provides API for signing in
        private readonly ApplicationSettings _appSettings;
        // Constructor DEPENDENCY Injection possible from the services invoked in Startup.cs
        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        // Registers the user
        [HttpPost]
        [Route("Register")] // PATH URL: /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };      // can't do Password property for security reasons

            try
            {
                // creates the User along with the password and turns it into a JSON object
                var result = await _userManager.CreateAsync(applicationUser, model.Password); // creates the specified user
                                                                                              // needs await keyword because of CreateAsync()
                return Ok(result);  // returns full JSON object AND a status 200 response
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // Login User
        [HttpPost]
        [Route("Login")] // PATH URL: /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            // REMEMBER to use await keyword if using async functions!


            // Use the _userManager property to check if the user given exists
            var user = await _userManager.FindByNameAsync(model.UserName);

            // Check if the user does exist and the Password along with the user is correct
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password)) 
            {
                // Now succesfully authenticate the User by adding the new Claims
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        // Set the token UserName data as the Id retrieved from _userManager
                        new Claim("UserID", user.Id.ToString())
                    }),
                    // Make token expire in 5 minutes
                    Expires = DateTime.UtcNow.AddDays(1),
                    // Signs the Data using the specified Security Algorithm
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };

                // Variables to create the token
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });   // returns full JSON object token AND 200 request response
            }
            else // return a HTTP Bad Request response object if User credentials are incorrect
            {
                return BadRequest(new
                {
                    message = "Username or password is incorrect!"
                });
            }
        }

    }
}
