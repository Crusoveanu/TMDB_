using TMDB.Data.Entities;
using TMDB.Data.Repository.IRepository;
using Dapper.SimpleRepository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace TMDB.Data.Services
{
    public class CommentService
    {
        private readonly ApplicationDbContext _context;
        public CommentService(ApplicationDbContext context)
        {
            _context = context;
        }
        public IList<Comment> GetCommentsByMovieId(int movieId) => _context.Comment
            .Where(c => c.MovieId == movieId)
            .Include(u => u.User)
            .ToList();
        public Comment GetCommentByMovieId(int movieId) => _context.Comment
            .Where(c => c.MovieId == movieId)
            .FirstOrDefault();
        public Comment Create(Comment comment)
        {
            comment.Date = System.DateTime.Now;
            _context.Comment.Add(comment);
            _context.SaveChanges();
            return comment;
        }
        public void Remove(int id)
        {
            var comment = _context.Comment.Where(c => c.Id == id).FirstOrDefault();
            _context.Comment.Remove(comment);

            _context.SaveChanges();
        }
    }
}
