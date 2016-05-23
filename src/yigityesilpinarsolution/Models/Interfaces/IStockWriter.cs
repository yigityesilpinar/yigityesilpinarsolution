using System;
using System.Collections.Generic;

namespace yigityesilpinarsolution.Models.Interfaces
{
    public interface IStockWriter
    {
        int write(IEnumerable<String[]> data);
    }
}
