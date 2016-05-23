using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using yigityesilpinarsolution.Models.Interfaces;

namespace yigityesilpinarsolution.Controllers
{
    // Derived from Mvc Controller Base class
    public class HomeController : Controller
    {
        private IStockRepository _repo;
        // Dependency Injection
        public HomeController(IStockRepository repo)
        {
            _repo = repo;
        }
        [AllowAnonymous]
        public ViewResult Index()
        {    
            var stocks = _repo.getAllStockData();
            return View(stocks);
        }



    }
}
