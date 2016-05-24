using System.Collections.Generic;
using System.Threading.Tasks;

namespace yigityesilpinarsolution.Models.Interfaces
{
    public interface IStockReader
    {
        Task<IEnumerable<string>> read();
    }
}
