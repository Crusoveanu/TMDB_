using TMDB.Data.Entities;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using TMDB.Data.Repository.IRepository;

namespace TMDB.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private IDbConnection _db;
        public UserRepository(string connectionString)
        {
            _db = new SqlConnection(connectionString);
        }

        public void Add(string firstName, string lastName, string password)
        {
            var parameters = new Dictionary<string, object>
            {
                { "FirstName", firstName},
                { "LastName", lastName},
                { "Password", password},
            };


            string sqlQuery = "INSERT INTO User ([FirstName], [LastName], [Password]) " +
                    "VALUES(@FirstName, @LastName, @Password)";

            _db.Execute(sqlQuery, parameters);
        }

        public User Find(int id)
        {
            var sql = "SELECT * FROM User WHERE Id =" + id;
            return _db.Query<User>(sql).First();
        }

        public List<User> GetAll()
        {
            var sql = "SELECT * FROM User";
            return _db.Query<User>(sql).ToList();
        }

        public List<User> GetAllByName(string firstName, string lastName)
        {
            var sql = "SELECT * FROM User WHERE FirstName = " + firstName;
            return _db.Query<User>(sql).ToList();
        }

        public void Remove(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
