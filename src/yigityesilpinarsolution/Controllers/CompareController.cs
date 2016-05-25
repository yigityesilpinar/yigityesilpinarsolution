using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using yigityesilpinarsolution.Models.Interfaces;

namespace yigityesilpinarsolution.Controllers
{
    public class CompareController:Controller
    {
        private IStockRepository _repo;
        // Dependency Injection

        public CompareController(IStockRepository repo)
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
