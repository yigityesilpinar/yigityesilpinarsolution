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
        public ViewResult Index()
       {
            var from = DateTime.Parse("05/01/1998");
            var to = DateTime.Parse("17/01/1998");
            var stocks = _repo.getDataForPeriod(from,to);
            //var model = new HomePageViewModel();
            return View(stocks);
        }
     
    }
}
