using Microsoft.AspNetCore.Mvc;
using Survey.BLL;
using Survey.Models;

namespace Survey_Personal.Controllers
{
    public class UserSurveyFormController : Controller
    {
        private IConfiguration Configuration;
        public UserSurveyFormController(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("Surveyshowform")]
        public IActionResult Survey_View_User(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsUserSurveyForm.Survey_List_Active(Con, info);
            return Ok(d);
        }
        [HttpGet]
        [Route("Surveyshowformquestion")]
        public IActionResult Survey_View_Question_User(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsUserSurveyForm.Survey_Detail_Show(Con, info);
            return Ok(d);
        }
        [HttpPost]
        [Route("Surveysaveresponse")]
        public IActionResult Survey_Save_Response(clsSurveySaveResponse info, clsSurveyShareLink info2, clsSurveyEmpShareLink info3)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyShareLink> mlist = clsSurveyCreation.Survey_List_ResponseAll(Con);
            List<clsSurveyEmpShareLink> mlist2 = clsEmployeeSurveyList.Employee_Survey_List(Con);
            var d = "";
            var e = "";
            var x = mlist.Where(x => x.UserEmail == info2.UserEmail && x.IDSurvey == info2.IDSurvey && x.Response == true).ToList();
            var y = mlist.Where(x => x.UserEmail == info2.UserEmail && x.IDSurvey == info2.IDSurvey).ToList();
            var z = mlist2.Where(x => x.EmpID == info3.EmpID && x.IDSurvey == info3.IDSurvey).ToList();
            if (x.Count == 0 && y.Count != 0)
            {
                d = clsUserSurveyForm.Survey_Save_Response(Con, info, info2);
                e = "";
            }
            else if (x.Count == 0 && z.Count != 0)
            {
                d = clsUserSurveyForm.Survey_Emp_Save_Response(Con, info, info3);
                e = "";
            }
            else if (y.Count == 0 || z.Count == 0)
            {
                e = "You are not assigned to submit this survey";
            }
            else if (x.Count != 0)
            {
                e = "You have already submitted your answers";
            }
            else
            {
                e = "Some error occured";
            }
            return Ok(e);
        }
    }
}
