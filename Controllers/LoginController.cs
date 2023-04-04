using Common.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Survey.BLL;
using Survey.Models;

namespace Survey_Personal.Controllers
{
    public class LoginController : Controller
    {
        private IConfiguration Configuration;
        public LoginController(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }
        public IActionResult Index()
        {
            //string name = "";
            //string ID = "";
            //string email = "";
            //if (!String.IsNullOrEmpty(HttpContext.Request.Query["UserName"]) && !String.IsNullOrEmpty(HttpContext.Request.Query["UserID"]) && !String.IsNullOrEmpty(HttpContext.Request.Query["UserEmail"]))
            //{
            //    name = HttpContext.Request.Query["UserName"];
            //    ID = HttpContext.Request.Query["UserID"];
            //    email = HttpContext.Request.Query["UserEmail"];
            //}
            //HttpContext.Session.SetString("UserName", name);
            //HttpContext.Session.SetString("UserId", ID);
            //HttpContext.Session.SetString("UserEmail", email);
            //return RedirectToAction("Index", "EmployeeSurveyList");

            return View();
        }
        [HttpPost]
        [Route("ValidLogin")]
        public JsonResult Valid_Login(String uname, String pwd)
        {
            String APIBaseurl = "http://salesapi.mendine.co.in/";
            clsAPI objAPI = new clsAPI(APIBaseurl);
            var data = new List<clsLoginResultInfo>();
            String apiMethod = "api/Emp/UserNamePwdcheck?uname=" + uname + "&pwd=" + pwd;
            HttpResponseMessage response = objAPI.APIPost(apiMethod);
            if (response.IsSuccessStatusCode)
            {
                string responseString = response.Content.ReadAsStringAsync().Result;
                if (!string.IsNullOrEmpty(responseString))
                {
                    data = JsonConvert.DeserializeObject<List<clsLoginResultInfo>>(responseString);
                    if (data.Count > 0 && data[0].Truefalse == true)
                    {
                        String Email = data[0].empemail;
                        String Designation = data[0].designationshortform;
                        String Empno = data[0].empno;
                        String EmpName = clsHelper.fnConvert2String(data[0].Empname);

                        // Session 
                        HttpContext.Session.SetString("Email", Email);
                        HttpContext.Session.SetString("Empno", Empno);
                        HttpContext.Session.SetString("Empname", EmpName);
                    }
                }
            }
            return new JsonResult(data);
        }
        //public IActionResult Login_Check(String UserName, String Password, clsLoginInfo info)
        //{
        //    string Con = this.Configuration.GetConnectionString("SurveyAdmin");
        //    var d = "";//clsLogin.Login_Check(Con, info);
        //    return Ok(d);

        //}
        
    }
}
