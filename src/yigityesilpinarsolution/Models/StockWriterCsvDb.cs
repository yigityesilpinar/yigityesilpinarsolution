﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using yigityesilpinarsolution.Models.Interfaces;

namespace yigityesilpinarsolution.Models
{
    public class StockWriterCsvDb : IStockWriter
    {
        private StockContext _context;

        public StockWriterCsvDb(StockContext context)
        {
            _context = context;
        }
        public int write(IEnumerable<string[]> data)
        {
            List<DateTime> testDates = new List<DateTime>();
            List<Double> testValues = new List<Double>();
            // To fill skipped dates with stall value
            var previousDate = DateTime.Parse(data.ElementAt(1)[0]).AddDays(-1);
            Double previousValue = 0.0;
            DateTime tempDate = new DateTime();
            data = data.Where(s => DateTime.TryParse(s[0], out tempDate));

            foreach (var item in data)
            {

                if (DateTime.Compare(previousDate.AddDays(1), tempDate) == 0)
                {
                    previousDate = previousDate.AddDays(1);
                }
                else
                {
                    while (DateTime.Compare(previousDate.AddDays(1), tempDate) != 0)
                    {
                        _context.Add(new Stock() { StockDate = previousDate.AddDays(1), StockValue = previousValue });
                        testDates.Add(previousDate.AddDays(1));
                        testValues.Add(previousValue);
                        previousDate = previousDate.AddDays(1);
                    }
                    previousValue = Double.Parse(item[1], CultureInfo.InvariantCulture);
                    continue;
                }

                previousValue = Double.Parse(item[1], CultureInfo.InvariantCulture);
                testDates.Add(tempDate);
                testValues.Add(previousValue);
                _context.Add(new Stock() { StockDate = tempDate, StockValue = previousValue });
            }
            // Add the last element
            _context.Add(new Stock()
            {
                StockDate = DateTime.Parse(data.Last()[0]),
                StockValue = Double.Parse(data.Last()[1], CultureInfo.InvariantCulture)
            });
            testDates.Add(DateTime.Parse(data.Last()[0]));
            testValues.Add(Double.Parse(data.Last()[1], CultureInfo.InvariantCulture));
           return _context.SaveChanges();
        }
    }
}