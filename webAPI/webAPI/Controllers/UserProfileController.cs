using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using webAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // Return/access details of the User (FullName, UserName, Email, etc)
        [HttpGet]   // PATH URL: /api/UserProfile
        [Authorize] // Makes the web api method secure and private
        public async Task<Object> GetUserProfile ()
        {
            // To access this secure WEB API, send the created token after the Login operation
            // The UserID Claim that we have created will be used to access the User Profile
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            // This variable will find the details of the User inside the UserDB
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.UserName,
                user.FullName,
                user.Email,
                user.Id
            };
        }
    }
}
