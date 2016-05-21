using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace yigityesilpinarsolution.Models
{
    public class StockRepository
    {
        private StockContext _context;
        private IEnumerable<Stock> _stocks;

        public StockRepository(StockContext context)
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
