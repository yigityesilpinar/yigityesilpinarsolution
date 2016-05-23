using System.Linq;
using yigityesilpinarsolution.Models.Interfaces;

namespace yigityesilpinarsolution.Models
{

    public class StockSeedDataDb:IDataSeeder
    {
        private StockContext _context;
        private IStockReader _reader;
        private IStockWriter _writer;

        public StockSeedDataDb(StockContext context, IStockReader reader, IStockWriter writer)
        {
            _writer = writer;
            _reader = reader;
            _context = context;
        }

        public void SeedData()
        {
            // IF Db Table is empty Seed Data
            if (!_context.Stocks.Any())
            {
                var data = _reader.read();
                var writeResult = _writer.write(data);
            }
        }
    }
}
