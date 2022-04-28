using TMDB.Data.Entities;
using System.Collections.Generic;

namespace TMDB.Data.Repository.IRepository
{
    public interface IUserRepository
    {
        List<User> GetAll();
        List<User> GetAllByName(string firstName, string lastName);
        User Find(int id);
        void Add(string firstName, string lastName, string password);
        void Remove(int id);
    }
}