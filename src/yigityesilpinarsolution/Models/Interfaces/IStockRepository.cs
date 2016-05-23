using System;
using System.Collections.Generic;

namespace yigityesilpinarsolution.Models.Interfaces
{
    public interface IStockRepository
    {
        IEnumerable<Stock> getAllStockData();
        IEnumerable<Stock> getDataForPeriod(DateTime from, DateTime to);
    }
}
