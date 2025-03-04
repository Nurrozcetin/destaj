using Destaj.Data;
using Destaj.Data.Models;
using Destaj.Pages;
using Microsoft.EntityFrameworkCore;

namespace Destaj.Business
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Data.Models.User>> ListAllUserAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> CreateUserAsync(Data.Models.User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateUserAsync(Data.Models.User user)
        {
            var existingUser = await _context.Users.FindAsync(user.Id);
            if (existingUser != null)
            {
                _context.Entry(existingUser).CurrentValues.SetValues(user);
            }
            else
            {
                _context.Users.Update(user);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null)
            {
                return false;
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}