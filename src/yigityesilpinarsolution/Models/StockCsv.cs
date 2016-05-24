using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using yigityesilpinarsolution.Models.Interfaces;

namespace yigityesilpinarsolution.Models
{
    public class StockReaderCsv 
    {
        public IEnumerable<string[]> read()
        {
            var filename = "data/data.csv";
            var contents = File.ReadAllText(filename).Split('\n');
            var csv = from line in contents select line.Split(',').ToArray();
            return csv;
        }
    }
    public class StockReaderCsvAsync: IStockReader
    {
        public async Task<IEnumerable<string>> read()
        {
            string filePath = @"data/data.csv";
            if (File.Exists(filePath) == false)
            {
                var emptyList = new List<string>();
                Console.WriteLine("file not found: " + filePath);
                return emptyList;
            }
            string data;
            using (FileStream sourceStream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read,
          bufferSize: 4096, useAsync: true))
            {
                StringBuilder sb = new StringBuilder();

                byte[] buffer = new byte[0x1000];
                int numRead;
                while ((numRead = await sourceStream.ReadAsync(buffer, 0, buffer.Length)) != 0)
                {

                    string text = Encoding.UTF8.GetString(buffer, 0, numRead);
                    sb.Append(text);

                }

               data = sb.ToString();

            }
            
            DateTime tempdate;
            var lines = data.Split(new string[] { "\r\n", "\n" }, StringSplitOptions.None).Where(d => DateTime.TryParse(d.Split(',')[0], out tempdate));
            return lines;

        }



    }
}


