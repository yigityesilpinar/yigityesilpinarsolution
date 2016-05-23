using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;

namespace yigityesilpinarsolution.Models
{
    public class StockContext: DbContext
    {
        public DbSet<Stock> Stocks { get; set; }

        public StockContext()
        {
          // Comment out for Db Table Creation 
          //  Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Configure connection string for Db
            var conString =Startup.Configuration["Data:StockContextConnection"];
            optionsBuilder.UseSqlServer(conString);
            
            base.OnConfiguring(optionsBuilder);
        }
    }
}
