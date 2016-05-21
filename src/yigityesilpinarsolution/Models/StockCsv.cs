using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace yigityesilpinarsolution.Models
{
    public static class StockCsv
    {


        public static IEnumerable<String[]> getCsv()
        {
            var filename = "data/data.csv";
            var contents = File.ReadAllText(filename).Split('\n');
            var csv = from line in contents
                      select line.Split(',').ToArray();
            return csv;
        }

    }
}
