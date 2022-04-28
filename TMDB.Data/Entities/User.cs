using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TMDB.Data.Entities
{
    public class User
    {
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(255)]
		public string FirstName { get; set; }
		[Required]
		[MaxLength(255)]
		public string LastName { get; set; }
		[Required]
		[MaxLength(255)]
		[JsonIgnore]
		public string UserPassword { get; set; }
		[Required]
		[MaxLength(50)]
		public string UserEmail { get; set; }
	}
}
