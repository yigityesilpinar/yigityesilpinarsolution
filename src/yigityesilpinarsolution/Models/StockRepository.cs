using System;
using System.Collections.Generic;
using System.Linq;
using yigityesilpinarsolution.Models.Interfaces;


namespace yigityesilpinarsolution.Models
{
    public class StockRepositoryDb :IStockRepository
    {
        private StockContext _context;
        private IEnumerable<Stock> _stocks;

        public StockRepositoryDb(StockContext context)
        {
            _context = context;
            _stocks = _context.Stocks.OrderBy(t=>t.StockDate).ToList();
        }
        public IEnumerable<Stock> getAllStockData()
        {
            return this._stocks;
        }

        public IEnumerable<Stock> getDataForPeriod(DateTime from, DateTime to) {

            return this._stocks.Where(t=>t.StockDate>from && t.StockDate<to).ToList();
        }
    }
}
