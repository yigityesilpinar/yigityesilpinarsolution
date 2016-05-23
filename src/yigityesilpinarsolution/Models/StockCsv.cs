using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using yigityesilpinarsolution.Models.Interfaces;

namespace yigityesilpinarsolution.Models
{


    public class StockReaderCsv : IStockReader
    {

        // TextFieldParser
        public IEnumerable<String[]> read()
        {

            var filename = "data/data.csv";
            var contents = File.ReadAllText(filename).Split('\n');
            var csv = from line in contents
                      select line.Split(',').ToArray();
            return csv;
        }

    }
    public class StockReaderCsvV2 : IStockReader
    {
        public IEnumerable<String[]> read()
        {

            //
            var filename = "data/data.csv";
            var contents = File.ReadAllText(filename).Split('\n');
            var csv = from line in contents
                      select line.Split(',').ToArray();
            return csv;

        }
    }
}


