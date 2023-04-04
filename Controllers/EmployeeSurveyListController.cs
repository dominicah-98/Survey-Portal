using Microsoft.AspNetCore.Mvc;
using Survey.BLL;
using Survey.Models;

namespace Survey_Personal.Controllers
{
    public class EmployeeSurveyListController : Controller
    {
        private IConfiguration Configuration;
        public EmployeeSurveyListController(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }
        public IActionResult Index()
        {
            //HttpContext.Session.SetString("UserName", "Dominica Halder");
            //HttpContext.Session.SetString("UserId", "101054");
            //HttpContext.Session.SetString("UserEmail", "dominica.halder@iecsl.co.in");


            return View();
        }
        [HttpGet]
        [Route("EmpSurveyList")]
        public IActionResult Employee_Survey_List(clsSurveyEmpShareLink info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyEmpShareLink> mlist = clsEmployeeSurveyList.Employee_Survey_List(Con);
            var d = mlist.Where(x => x.EmpID == info.EmpID).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("EmpSurveyDetail")]
        public IActionResult Survey_Detail(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyCreationInfo> mlist = clsSurveyCreation.Survey_List_All(Con);
            //var d = new List<clsSurveyCreationInfo>();
            //var d;
            //foreach (var item in info.Survey)
            //{
            //   d = mlist.Where(x => x.IDSurvey == item.IDSurvey).ToList();
            //}
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("ApprseeDetail")]
        public IActionResult Appraisee_Detail(clsSurveyEmpShareLink info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsEmpInfo> mlist = clsSurveyCreation.Employee_List(Con);
            var d = mlist.Where(x => x.empno == info.Appraisee).ToList();
            return Ok(d);
        }
    }
}
