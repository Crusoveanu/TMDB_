using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMDB.Data.Models.DTO.User
{
    public class RegisterDto
    {
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
