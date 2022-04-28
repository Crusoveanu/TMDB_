using TMDB.Data.Entities;
using TMDB.Data.Repository.IRepository;
using Dapper.SimpleRepository;
using System.Linq;

namespace TMDB.Data.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserRepository _repository;
        private readonly Repository<User> _simpleRepository;
        public UserService(ApplicationDbContext context, Repository<User> repository, IUserRepository userRepo)
        {
            _context = context;
            _repository = userRepo;
            _simpleRepository = repository;
        }

        public User GetUserByEmail(string email)
        {
            var user = _context.UserDb.Where(u => u.UserEmail== email).FirstOrDefault();
            return user;
        }

        public User Create(User user)
        {
            _context.UserDb.Add(user);
            _context.SaveChanges();
            return user;

        }

        public User GetUserById(int id)
        {
            var user = _context.UserDb.Where(f => f.Id == id).FirstOrDefault();
            return user;
        }

        public void Remove(int id)
        {
            var item = _context.UserDb.Where(u => u.Id == id).FirstOrDefault();
            _context.UserDb.Remove(item);

            _context.SaveChanges();
        }
    }
}
