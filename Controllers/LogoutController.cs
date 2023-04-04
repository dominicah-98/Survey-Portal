using Microsoft.AspNetCore.Mvc;

namespace Survey_Personal.Controllers
{
    public class LogoutController : Controller
    {
        public IActionResult Index()
        {
            HttpContext.Session.Remove("UserName");
            HttpContext.Session.Remove("UserId");
            HttpContext.Session.Remove("UserEmail");

            HttpContext.Session.Clear();

            //return RedirectToAction("Index", "Home");
            //return View();
            return Redirect("https://hrms.mendine.co.in/Account/ChoosePortal.aspx");
        }
    }
}
