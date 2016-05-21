using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace yigityesilpinarsolution.Controllers
{
    // Derived from Mvc Controller Base class
    public class HomeController : Controller
    {
        [AllowAnonymous]
        public ViewResult Index()
        {
            //var model = new HomePageViewModel();
            return View();
        }
     
    }
}
