using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using yigityesilpinarsolution.Models.Interfaces;

namespace yigityesilpinarsolution.Models
{
    public static partial class DatetimeExtensions
    {
        public static DateTime ParseToDate(this string date)
        {
            var dateSplit = date.Split('/');
            var day = Int32.Parse(dateSplit[0]);
            var month = Int32.Parse(dateSplit[1]);
            var year = Int32.Parse(dateSplit[2]);
            return new DateTime(year, month, day);
        }

    }
    public class StockWriterCsvDb : IStockWriter
    {
        private StockContext _context;

        public StockWriterCsvDb(StockContext context)
        {
            _context = context;
        }

        public int write(IEnumerable<string> data)
        {
           
            var dataList = data.Select(c => c.Split(','));
            IEnumerable<DateTime> dates = dataList.Select(dl => dl[0].ParseToDate());
            IEnumerable<Double> values = dataList.Select(dl => Double.Parse(dl[1], CultureInfo.InvariantCulture));
            var dateValueDictionary = new Dictionary<DateTime, Double>();
            // TO test the algorithm
            //var extendedDictionary = new Dictionary<DateTime, Double>();
            int index = 0;
            foreach (var value in values)
            {
                dateValueDictionary.Add(dates.ElementAt(index), value);
                index++;
            }
            DateTime tempDate;
            foreach (var keyValue in dateValueDictionary)
            {
                //extendedDictionary.Add(keyValue.Key, keyValue.Value);
                _context.Add(new Stock() { StockDate = keyValue.Key, StockValue = keyValue.Value });
                tempDate = keyValue.Key;
                while (!dateValueDictionary.ContainsKey(tempDate.AddDays(1)) && tempDate<dateValueDictionary.Keys.Last())
                {
                    tempDate = tempDate.AddDays(1);
                  //  extendedDictionary.Add(tempDate, keyValue.Value);
                    _context.Add(new Stock() { StockDate=tempDate,StockValue= keyValue.Value });
                }
            }

            return _context.SaveChanges(); ;
        }
    }
}
