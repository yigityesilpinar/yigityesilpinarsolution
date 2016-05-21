using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using System;
using System.Linq;
using yigityesilpinarsolution.Models;

namespace yigityesilpinarsolution.Controllers
{
    // Derived from Mvc Controller Base class
    public class HomeController : Controller
    {
        private StockRepository _repo;
        // Dependency Injection
        public HomeController(StockRepository repo)
        {
            _repo = repo;
        }
        [AllowAnonymous]
        public ViewResult Index(StockContext context)
        {
            var _repo = new StockRepository(context);
            //var from = new DateTime(year: 1998, month: 01, day: 10);
            //var to = new DateTime(year:1998,month:01,day:17);
            var stocks = _repo.getAllStockData();
      
            return View(stocks);
        }



    }
}
