using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class AuthenticationContext: IdentityDbContext       // Authentications inherits from IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions<AuthenticationContext> options): base(options)
        {

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<List> ListItems { get; set; }
    }
}
