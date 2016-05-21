using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace yigityesilpinarsolution.Controllers
{
    public class CompareController:Controller
    {
        [AllowAnonymous]
        public ViewResult Index()
        {
            //var model = new HomePageViewModel();
            return View();
        }

    }
}
