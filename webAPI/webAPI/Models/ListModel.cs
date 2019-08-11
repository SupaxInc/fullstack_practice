using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class ListModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public char IsCompleted { get; set; }
        public DateTime LastModified { get; set; }
        public string UserFK { get; set; }
    }
}
