using System;
using System.Globalization;
using System.Linq;

namespace yigityesilpinarsolution.Models
{

    public class StockContextSeedData
    {
        private StockContext _context;

        public StockContextSeedData(StockContext context)
        {
            _context = context;
        }

        public void EnsureSeedData()
        {

            if (!_context.Stocks.Any())
            {

                var csv = StockCsv.getCsv();


                foreach (var item in csv)
                {

                    DateTime tempDate;
                    if (DateTime.TryParse(item[0], out tempDate))
                    {
                        _context.Add(new Stock() { StockDate = tempDate, StockValue = Double.Parse(item[1], CultureInfo.InvariantCulture) });

                        var x = item[1];
                        var y = Double.Parse(item[1], CultureInfo.InvariantCulture);
                    }



                }
                _context.SaveChanges();

            }
        }
    }
}
