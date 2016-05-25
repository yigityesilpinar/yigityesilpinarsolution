using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task SeedData()
        {
            IEnumerable<string> lines;
            // IF Db Table is empty Seed Data
            if (!_context.Stocks.Any())
            {
                lines = await _reader.read();           
                var writeResult = _writer.write(lines);
            }

            
        }
    }
}
