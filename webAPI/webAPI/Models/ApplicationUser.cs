using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    // Class will be used to add/modify the User Database Table
    public class ApplicationUser: IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]    // specifying FullName property database type
        public string FullName { get; set; }

        [ForeignKey("UserFK")]
        public ICollection<List> Lists { get; set; }

    }
}
