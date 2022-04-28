using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMDB.Data.Entities
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int MovieId { get; set; }
        [Required]
        public int UserId { get; set; }
        [MaxLength(255)]
        public string UserComment { get; set; }
        public DateTime Date { get; set; }
        public User User { get; set; }
    }
}
