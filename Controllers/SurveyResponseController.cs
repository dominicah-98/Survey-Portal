using Microsoft.AspNetCore.Mvc;
using Survey.BLL;
using Survey.Models;
using System;

namespace Survey_Personal.Controllers
{
    public class SurveyResponseController : Controller
    {
        private IConfiguration Configuration;
        public SurveyResponseController(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }
        public IActionResult Index()
        {
            //HttpContext.Session.SetString("UserName", "MAYUKH CHOWDHURY");
            //HttpContext.Session.SetString("UserId", "101010");
            //HttpContext.Session.SetString("UserEmail", "mayukh.chowdhury@iecsl.co.in");
            return View();
        }
        [HttpGet]
        [Route("Surveyresponselist")]
        public IActionResult Survey_List_Response(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyShareLink> mlist = clsSurveyCreation.Survey_List_ResponseAll(Con);
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("SurveyEmpresponselist")]
        public IActionResult Employee_Survey_List_Response(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyEmpShareLink> mlist = clsEmployeeSurveyList.Employee_Survey_List(Con);
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("Surveylistactivedetails")]
        public IActionResult Survey_List_Active(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyCreationInfo> mlist = clsSurveyCreation.Survey_List_Active(Con);
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("SurveyshowformInfo")]
        public IActionResult Survey_View_User(clsSurveyShareLink info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyCreationInfo> mlist = clsSurveyCreation.Survey_List_Active(Con);
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("Surveyresponseformquestion")]
        public IActionResult Survey_View_Question_User(clsSurveyDetailInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Detail_Show(Con, info);
            return Ok(d);
        }
        [HttpGet]
        [Route("Surveyuserresponse")]
        public IActionResult Survey_View_User_Response(clsSurveyShareLink info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyResponse.Survey_View_User_Response(Con, info);
            return Ok(d);
        }
        [HttpGet]
        [Route("SurveyEmpuserresponse")]
        public IActionResult Survey_View_Emp_Response(clsSurveyEmpShareLink info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyResponse.Survey_View_Emp_Response(Con, info);
            return Ok(d);
        }
        [HttpPost]
        [Route("Surveysaveresponsemarks")]
        public IActionResult Survey_Save_Response(clsSurveySaveResponse info, clsSurveyShareLink info2)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsUserSurveyForm.Survey_Save_Response(Con, info, info2);
            return Ok(d);
        }
        [HttpPost]
        [Route("SurveysaveEmpresponsemarks")]
        public IActionResult Survey_Save_Emp_Response(clsSurveySaveResponse info, clsSurveyEmpShareLink info2)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsUserSurveyForm.Survey_Emp_Save_Response(Con, info, info2);
            return Ok(d);
        }

        [HttpGet]
        [Route("EmpListInfo")]
        public IActionResult Employee_List(clsEmpInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsEmpInfo> mlist = clsSurveyCreation.Employee_List(Con);
            var d = mlist.Where(x => x.empno == info.empno).ToList();
            return Ok(d);
        }

        [HttpGet]
        [Route("GenericSurveyList")]
        public IActionResult Generic_Survey_List(clsSurveyCreationInfo info, clsSurveyDetailInfo info2)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyResponseInfo> mlist = clsSurveyResponse.Survey_View_Emp_Response_All(Con, info);
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey && x.QuestionNo == info2.QuestionNo).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("SurveyGenresponseformquestion")]
        public IActionResult Survey_View_Per_Question_User(clsSurveyDetailInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyDetailInfo> mlist = clsSurveyCreation.Survey_Detail_Show(Con, info);
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey && x.QuestionNo == info.QuestionNo).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("ResponsetblApprseeDetail")]
        public IActionResult Appraisee_Detail_Responsetbl(clsSurveyEmpShareLink info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsEmpInfo> mlist = clsSurveyCreation.Employee_List(Con);
            var d = mlist.Where(x => x.empno == info.Appraisee).ToList();
            return Ok(d);
        }
    }
}
