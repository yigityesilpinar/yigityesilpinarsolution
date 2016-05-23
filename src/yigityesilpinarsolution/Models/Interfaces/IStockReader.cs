using System.Collections.Generic;

namespace yigityesilpinarsolution.Models.Interfaces
{
    public interface IStockReader
    {
        IEnumerable<string[]> read();
    }
}
