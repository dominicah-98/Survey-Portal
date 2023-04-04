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
            string name = "";
            string ID = "";
            string email = "";
            if (!String.IsNullOrEmpty(HttpContext.Request.Query["UserName"]) && !String.IsNullOrEmpty(HttpContext.Request.Query["UserID"]) && !String.IsNullOrEmpty(HttpContext.Request.Query["UserEmail"]))
            {
                name = HttpContext.Request.Query["UserName"];
                ID = HttpContext.Request.Query["UserID"];
                email = HttpContext.Request.Query["UserEmail"];
            }
            HttpContext.Session.SetString("UserName", name);
            HttpContext.Session.SetString("UserId", ID);
            HttpContext.Session.SetString("UserEmail", email);
            return RedirectToAction("Index", "EmployeeSurveyList");

            //return View();
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
        //[HttpPost]
        //public JsonResult ValidLogin(String uname, String pwd)
        //{

        //    String APIBaseurl = ConfigurationManager.AppSettings["APILogin"];
        //    clsAPI objAPI = new clsAPI(APIBaseurl);
        //    var data = new List<clsLoginResultInfo>();
        //    String apiMethod = "";
        //    apiMethod = "api/Emp/UserNamePwdcheck?uname=" + uname + "&pwd=" + pwd;
        //    HttpResponseMessage response = objAPI.APIPost(apiMethod);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string responseString = response.Content.ReadAsStringAsync().Result;
        //        if (!string.IsNullOrEmpty(responseString))
        //        {
        //            data = JsonConvert.DeserializeObject<List<clsLoginResultInfo>>(responseString);
        //            if (data.Count > 0 && data[0].Truefalse == true)
        //            {
        //                String Email = data[0].empemail;
        //                String Designation = data[0].designationshortform;
        //                String Empno = data[0].empno;
        //                String EmpName = clsHelper.fnConvert2String(data[0].Empname);

        //                // HQ seperate SP as it's not coming from API 
        //                String ConString = ConfigurationManager.ConnectionStrings["SalesMaestroz"].ToString();
        //                List<clsLoginResultInfo> mlogin = clsLogin.EmployeeDetail(ConString, Empno);

        //                // Session 
        //                Session["HQ"] = mlogin.Count > 0 ? mlogin[0].HQ : " ";
        //                Session["Division"] = clsHelper.fnConvert2String(data[0].Division);
        //                Session["Empname"] = clsHelper.fnConvert2String(data[0].Empname);
        //                Session["Designation"] = clsHelper.fnConvert2String(data[0].designationname);
        //                Session["ShortName"] = clsHelper.fnConvert2String(data[0].designationshortform);
        //                Session["EmpEmail"] = clsHelper.fnConvert2String(data[0].empemail);
        //                Session["Empno"] = clsHelper.fnConvert2String(data[0].empno);
        //                Session["IDCycleGroup"] = mlogin.Count > 0 ? mlogin[0].IDCycleGroup.ToString() : "0";

        //                // Audit Log 
        //                //String message = "";
        //                ClsAuditLogInfo info = new ClsAuditLogInfo();
        //                info.AccessLog = "CRM LOGIN";
        //                info.AccessPage = "LOGIN";
        //                info.UserCode = Empno;
        //                info.UserEmail = Email;
        //                info.UserName = EmpName;
        //                info.division = Session["Division"].ToString();
        //                var d = clsLogin.AuditLogInfo(ConString, info);
        //                // Forcefully change the Division 
        //                if (uname.ToUpper() == "megha.bose@mendine.com".ToUpper())
        //                {
        //                    Session["Division"] = "PHOENIX";
        //                }
        //                if (uname.ToUpper() == "ankita.saha@mendine.com".ToUpper())
        //                {
        //                    Session["Division"] = "CONCORD";
        //                }

        //                // API Defining
        //                Session["APIDBurl"] = ConfigurationManager.AppSettings["APIDBurl"].ToString();
        //                Session["APISalesurl"] = ConfigurationManager.AppSettings["APILogin"].ToString();
        //                Session["ProfileName"] = data[0].Empname + "-" + Session["Empno"] + " ( " + clsHelper.fnConvert2String(data[0].designationshortform) + " )";
        //            }
        //        }
        //    }
        //    return Json(new { data }, JsonRequestBehavior.AllowGet);
        //}
    }
}
