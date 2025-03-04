using Destaj.Data.Models;

namespace Destaj.Business
{
    public interface IUserService
    {
        Task<bool>CreateUserAsync(User user);
        Task<bool>UpdateUserAsync(User user);
        Task<List<User>> ListAllUserAsync();
        Task<bool> DeleteUserAsync(int id);
    }
}
