using Microsoft.AspNetCore.Mvc;
using Survey.BLL;
using Survey.Models;
using System.Net;
using System.Net.Mail;

namespace Survey_Personal.Controllers
{
    public class SurveyCreationController : Controller
    {
        //private readonly ClsMailSettings _mailsettings;
        private IConfiguration Configuration;
        public SurveyCreationController(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }
        public IActionResult Index()
        {
            HttpContext.Session.SetString("mfromEmail", Configuration.GetSection("MailSettings").GetSection("mfromEmail").Value);
            HttpContext.Session.SetString("Username", Configuration.GetSection("MailSettings").GetSection("Username").Value);
            HttpContext.Session.SetString("Password", Configuration.GetSection("MailSettings").GetSection("Password").Value);
            HttpContext.Session.SetString("SMTPServer", Configuration.GetSection("MailSettings").GetSection("SMTPServer").Value);
            HttpContext.Session.SetString("SMTP_Port", Configuration.GetSection("MailSettings").GetSection("SMTP_Port").Value);
            HttpContext.Session.SetString("EnableSSL_TrueFalse", Configuration.GetSection("MailSettings").GetSection("EnableSSL_TrueFalse").Value);

            //HttpContext.Session.SetString("UserName", "MAYUKH CHOWDHURY");
            //HttpContext.Session.SetString("UserId", "101010");
            //HttpContext.Session.SetString("UserEmail", "mayukh.chowdhury@iecsl.co.in");

            //string name = "";
            //string ID = "";
            //string email = "";
            //if (!String.IsNullOrEmpty(HttpContext.Request.Query["UserName"]) && !String.IsNullOrEmpty(HttpContext.Request.Query["UserID"]) && !String.IsNullOrEmpty(HttpContext.Request.Query["UserEmail"]))
            //{
            //    name = HttpContext.Request.Query["UserName"];
            //    ID = HttpContext.Request.Query["UserID"];
            //    email = HttpContext.Request.Query["UserEmail"];
            //    HttpContext.Session.SetString("UserName", name);
            //    HttpContext.Session.SetString("UserId", ID);
            //    HttpContext.Session.SetString("UserEmail", email);
            //    return View();
            //}
            //else
            //{
            //    return Redirect("http://localhost:63735/Account/Login.aspx?ReturnUrl=%2fLogin.aspx");
            //    //return Redirect("https://hrms.mendine.co.in/Account/Login.aspx?ReturnUrl=%2f");
            //}
            return View();
        }
        [HttpGet]
        [Route("SaveSurvey")]
        public IActionResult Survey_Save(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Save(Con, info);
            return Ok(d);
        }
        //[HttpPost]
        //[Route("SaveSurveyMarks")]
        //public IActionResult Survey_Save_Marks(clsSurveyCreationInfo info)
        //{
        //    string Con = this.Configuration.GetConnectionString("SurveyAdmin");
        //    var d = clsSurveyCreation.Survey_Save(Con, info);
        //    return Ok(d);
        //}

        [HttpPost]
        [Route("SaveSurveyDetail")]
        public IActionResult Survey_Detail_Save(clsSurveyQuestionInfo info, clsSurveyCreationInfo info2)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Detail_Save(Con, info, info2);
            return Ok(d);
        }
        [HttpGet]
        [Route("Surveycheckdetailinfo")]
        public IActionResult Survey_Check_Detail_Info(clsSurveyDetailInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Check_Detail_Info(Con, info);
            return Ok(d);
        }

        [HttpGet]
        [Route("Surveydetailshow")]
        public IActionResult Survey_Detail_Show(clsSurveyDetailInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Detail_Show(Con, info);
            return Ok(d);
        }

        [HttpGet]
        [Route("Surveylistall")]
        public IActionResult Survey_List()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_List_All(Con);
            return Ok(d);
        }
        [HttpGet]
        [Route("Surveylistactive")]
        public IActionResult Survey_List_Active()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_List_Active(Con);
            var e = clsSurveyCreation.Survey_List_Response_Active(Con);
            return Ok(d);
        }
        [HttpGet]
        [Route("Surveylistinactive")]
        public IActionResult Survey_List_Inactive()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_List_INActive(Con);
            return Ok(d);
        }

        //[HttpGet]
        //[Route("Surveylistresponse")]
        //public IActionResult Survey_List_Response()
        //{
        //    string Con = this.Configuration.GetConnectionString("SurveyAdmin");
        //    var d = clsSurveyCreation.Survey_List_ResponseAll(Con);
        //    return Ok(d);
        //}
        [HttpPost]
        [Route("Surveylistresponseall")]
        public IActionResult Survey_List_Response(clsSurveyShareLink info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyShareLink> mlist = clsSurveyCreation.Survey_List_ResponseAll(Con);
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            Response.Redirect("/UserSurveyForm?id=" + info.IDSurvey);
            return Ok(d);
        }
        [HttpGet]
        [Route("Surveylistresponseactive")]
        public IActionResult Survey_List_Response_Active()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_List_Response_Active(Con);
            //var count1 = Int32.Parse(d.Count.ToString());
            //var count = count1 + count2;
            return Ok(d);
        }
        [HttpGet]
        [Route("SurveyEmplistresponseactive")]
        public IActionResult Survey_List_Emp_Response_Active()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var e = clsEmployeeSurveyList.Survey_List_Emp_Response_Active(Con);
            return Ok(e);
        }
        [HttpGet]
        [Route("Surveylistshare")]
        public IActionResult Survey_List_Share()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_List_ResponseAll(Con);
            return Ok(d);
        }
        [HttpGet]
        [Route("SurveyEmplistshare")]
        public IActionResult Survey_List_Emp_Share()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var e = clsEmployeeSurveyList.Employee_Survey_List(Con);
            return Ok(e);
        }
        [HttpGet]
        [Route("Surveylistresponseinactive")]
        public IActionResult Survey_List_Response_INActive()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_List_Response_INActive(Con);
            return Ok(d);
        }

        [HttpGet]
        [Route("Surveyremove")]
        public IActionResult Survey_Remove(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Remove(Con, info.IDSurvey, info.EntryUser);
            return Ok(d);
        }
        [HttpGet]
        [Route("SurveyPublish")]
        public IActionResult Survey_Publish(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Publish(Con, info.IDSurvey, info.EntryUser);
            List<clsSurveyCreationInfo> mlist = clsSurveyCreation.Survey_List_Active(Con);
            var x = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();

            List<clsSurveyShareLink> mlist1 = clsSurveyCreation.Survey_List_ResponseAll(Con);
            var y = mlist1.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            List<clsSurveyEmpShareLink> mlist2 = clsEmployeeSurveyList.Employee_Survey_List(Con);
            var z = mlist2.Where(x => x.IDSurvey == info.IDSurvey).ToList();

            var listOfEmails = new List<string>();

            if (y.Count> 0)
            {
                for (var i = 0; i < y.Count; i++)
                {
                    listOfEmails.Add(y[i].UserEmail);
                }
            }
            if (z.Count> 0)
            {
                for (var i = 0; i < z.Count; i++)
                {
                    var empid = z[i].EmpID;
                    var empemail = "";
                    List<clsEmpInfo> mlist3 = clsSurveyCreation.Employee_List(Con);
                    var a = mlist3.Where(x => x.empno == empid).ToList();
                    empemail = a[0].empemail;
                    listOfEmails.Add(empemail);
                }
            }
            listOfEmails.Add(info.UpdateUser);
            //listOfEmails.Add("richagomes1998@gmail.com");

            String textbody = "";
            textbody += "One survey named: <b>" + x[0].Name + "</b> has been published"; //+ Environment.NewLine;

            string SMTPServer = HttpContext.Session.GetString("SMTPServer");
            bool EnableSSL_TrueFalse = Convert.ToBoolean(HttpContext.Session.GetString("EnableSSL_TrueFalse"));
            string Username = HttpContext.Session.GetString("Username");
            string Password = HttpContext.Session.GetString("Password");
            int SMTP_Port = Convert.ToInt32(HttpContext.Session.GetString("SMTP_Port"));
            string mfromEmail = HttpContext.Session.GetString("mfromEmail");

            string EmailStatus = "";
            try
            {
                using (MailMessage mm = new MailMessage())
                {
                    mm.From = new MailAddress(mfromEmail);
                    mm.To.Add(mfromEmail);
                    mm.Subject = "Survey Publish: " + x[0].Name;
                    mm.Body = textbody;
                    mm.IsBodyHtml = true;
                    //string[] Multi = request.mToEmail.ToArray();
                    foreach (string Multimailid in listOfEmails)
                    {
                        mm.To.Add(new MailAddress(Multimailid));
                    }
                    //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                    //mm.To.Add(new MailAddress(info.EntryUser));
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = SMTPServer;
                    smtp.EnableSsl = EnableSSL_TrueFalse;
                    NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = SMTP_Port;
                    smtp.Send(mm);
                    EmailStatus = "";
                    return Ok(EmailStatus);
                }
            }
            catch (Exception ex)
            {
                EmailStatus = ex.Message.ToString();
                return Ok(EmailStatus);
            }
            finally { }

            //return Ok(d);
        }
        [HttpGet]
        [Route("SurveyUnPublish")]
        public IActionResult Survey_UnPublish(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_UnPublish(Con, info.IDSurvey, info.EntryUser);

            List<clsSurveyCreationInfo> mlist = clsSurveyCreation.Survey_List_Active(Con);
            var x = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();

            List<clsSurveyShareLink> mlist1 = clsSurveyCreation.Survey_List_ResponseAll(Con);
            var y = mlist1.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            List<clsSurveyEmpShareLink> mlist2 = clsEmployeeSurveyList.Employee_Survey_List(Con);
            var z = mlist2.Where(x => x.IDSurvey == info.IDSurvey).ToList();

            var listOfEmails = new List<string>();

            if (y.Count > 0)
            {
                for (var i = 0; i < y.Count; i++)
                {
                    listOfEmails.Add(y[i].UserEmail);
                }
            }
            if (z.Count > 0)
            {
                for (var i = 0; i < z.Count; i++)
                {
                    var empid = z[i].EmpID;
                    var empemail = "";
                    List<clsEmpInfo> mlist3 = clsSurveyCreation.Employee_List(Con);
                    var a = mlist3.Where(x => x.empno == empid).ToList();
                    empemail = a[0].empemail;
                    listOfEmails.Add(empemail);
                }
            }
            listOfEmails.Add(info.UpdateUser);
            //listOfEmails.Add("richagomes1998@gmail.com");

            String textbody = "";
            textbody += "You have unpublished one survey named: <b>" + x[0].Name + "</b>"; //+ Environment.NewLine;

            string SMTPServer = HttpContext.Session.GetString("SMTPServer");
            bool EnableSSL_TrueFalse = Convert.ToBoolean(HttpContext.Session.GetString("EnableSSL_TrueFalse"));
            string Username = HttpContext.Session.GetString("Username");
            string Password = HttpContext.Session.GetString("Password");
            int SMTP_Port = Convert.ToInt32(HttpContext.Session.GetString("SMTP_Port"));
            string mfromEmail = HttpContext.Session.GetString("mfromEmail");

            string EmailStatus = "";
            try
            {
                using (MailMessage mm = new MailMessage())
                {
                    mm.From = new MailAddress(mfromEmail);
                    mm.To.Add(mfromEmail);
                    mm.Subject = "Survey Unpublish: " + x[0].Name;
                    mm.Body = textbody;
                    mm.IsBodyHtml = true;
                    //string[] Multi = request.mToEmail.ToArray();
                    foreach (string Multimailid in listOfEmails)
                    {
                        mm.To.Add(new MailAddress(Multimailid));
                    }
                    //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                    //mm.To.Add(new MailAddress(info.UpdateUser));
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = SMTPServer;
                    smtp.EnableSsl = EnableSSL_TrueFalse;
                    NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = SMTP_Port;
                    smtp.Send(mm);
                    EmailStatus = "";
                    return Ok(EmailStatus);
                }
            }
            catch (Exception ex)
            {
                EmailStatus = ex.Message.ToString();
                return Ok(EmailStatus);
            }
            finally { }

            //return Ok(d);
        }
        [HttpGet]
        [Route("SurveyDetail")]
        public IActionResult Survey_Detail(clsSurveyCreationInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyCreationInfo> mlist = clsSurveyCreation.Survey_List_All(Con);
            var d = mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
            return Ok(d);
        }
        [HttpGet]
        [Route("SurveyTypeList")]
        public IActionResult Survey_Type(clsSurveyType info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Type_Active(Con);
            return Ok(d);
        }
        [HttpGet]
        [Route("QuestionType")]
        public IActionResult Question_Type()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Question_Type_List(Con);
            return Ok(d);
        }
        [HttpGet]
        [Route("AnswerType")]
        public IActionResult Answer_Type()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Answer_Type_List(Con);
            return Ok(d);
        }
        [HttpGet]
        [Route("DeptList")]
        public IActionResult Department_List()
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Department_List(Con);
            return Ok(d);
        }
        [HttpGet]
        [Route("EmpList")]
        public IActionResult Employee_List(clsDeptInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsEmpInfo> mlist = clsSurveyCreation.Employee_List(Con);
            var d = mlist.Where(x => x.empdept == info.DepartmentId).ToList();
            return Ok(d);
        }

        [HttpPost]
        [Route("ShareLink")]
        public IActionResult fnSendEmail(clsSendMail request, clsSurveyCreationInfo info, clsSurveyShareLink info2)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_GUID(Con, info.IDSurvey);

            var x = clsSurveyCreation.Survey_Email_Link_Save(Con, request, info.IDSurvey);
            if (x == null)
            {
                String url = "";
                url += Configuration.GetSection("SurveyLink").GetSection("SurveyURL").Value;
                url += d[0].SurveyGUID;

                string surveyName = d[0].Name;

                String textbody = "";
                textbody += "Please click the attached link to fill out the form" + Environment.NewLine;
                textbody += "Link: " + url;


                string SMTPServer = HttpContext.Session.GetString("SMTPServer");
                bool EnableSSL_TrueFalse = Convert.ToBoolean(HttpContext.Session.GetString("EnableSSL_TrueFalse"));
                string Username = HttpContext.Session.GetString("Username");
                string Password = HttpContext.Session.GetString("Password");
                int SMTP_Port = Convert.ToInt32(HttpContext.Session.GetString("SMTP_Port"));
                string mfromEmail = HttpContext.Session.GetString("mfromEmail");

                string EmailStatus = "";
                try
                {
                    using (MailMessage mm = new MailMessage())
                    {
                        mm.From = new MailAddress(mfromEmail);
                        mm.To.Add(mfromEmail);
                        mm.Subject = surveyName;
                        mm.Body = textbody;
                        //string[] Multi = request.mToEmail.ToArray();
                        foreach (string Multimailid in request.mToEmail)
                        {
                            mm.To.Add(new MailAddress(Multimailid));
                        }
                        SmtpClient smtp = new SmtpClient();
                        smtp.Host = SMTPServer;
                        smtp.EnableSsl = EnableSSL_TrueFalse;
                        NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = NetworkCred;
                        smtp.Port = SMTP_Port;
                        smtp.Send(mm);
                        EmailStatus = "";
                        return Ok(EmailStatus);
                    }
                }
                catch (Exception ex)
                {
                    EmailStatus = ex.Message.ToString();
                    return Ok(EmailStatus);
                }
                finally { }
            }
            else
            {
                return Ok(x);
            }
        }

        [HttpPost]
        [Route("CheckEmployeeLink")]
        public IActionResult Survey_Share_Emp_Check(clsSurveyEmpShareInfo info)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Share_Emp_Check(Con, info);
            //var x = "";
            //if (d == "1")
            //{
            //    x = "Some Error Occured";
            //}
            return Ok(d);
        }
        [HttpPost]
        [Route("SaveEmployeeLink")]
        public IActionResult Survey_Share_Emp(clsSurveyEmpShareInfo info, clsEmpInfo info2)
        {
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Share_Emp(Con, info, info2);
            var y = "";

            string SMTPServer = HttpContext.Session.GetString("SMTPServer");
            bool EnableSSL_TrueFalse = Convert.ToBoolean(HttpContext.Session.GetString("EnableSSL_TrueFalse"));
            string Username = HttpContext.Session.GetString("Username");
            string Password = HttpContext.Session.GetString("Password");
            int SMTP_Port = Convert.ToInt32(HttpContext.Session.GetString("SMTP_Port"));
            string mfromEmail = HttpContext.Session.GetString("mfromEmail");

            var listOfEmails = new List<string>();
            var listOfRetaggedEmails = new List<string>();
            var surveyname = "";
            var surveyCreationEmail = "";
            String tag = "";
            String retag = "";
            string EmailStatus = "";
            string EmailRetagStatus = "";
            List<clsEmpInfo> mlist = clsSurveyCreation.Employee_List(Con);
            foreach (var item in info.EmpShare)
            {
                //Survey Name Fetching
                List<clsSurveyCreationInfo> mlist1 = clsSurveyCreation.Survey_List_Active(Con);
                var x = mlist1.Where(x => x.IDSurvey == item.IDSurvey).ToList();
                surveyname = x[0].Name;
                surveyCreationEmail = x[0].EntryUser;

                if (item.Retag == false)
                {
                    //Employee Mail Fetch
                    var a = mlist.Where(x => x.empno == item.EmpID).ToList();
                    var empemail = a[0].empemail;
                    listOfEmails.Add(empemail);
                    tag = "One survey named: <b>" + surveyname + "</b> has been tagged.<br><a href='https://hrms.mendine.co.in/Account/Login.aspx?ReturnUrl=%2f'>Click here</a> to check."; //+ Environment.NewLine;
                }
                else if (item.Retag == true)
                {
                    //Employee Mail Fetch
                    var a = mlist.Where(x => x.empno == item.EmpID).ToList();
                    var empemail = a[0].empemail;
                    listOfRetaggedEmails.Add(empemail);
                    retag = "One survey named: <b>" + surveyname + "</b> has been retagged.<br><a href='https://hrms.mendine.co.in/Account/Login.aspx?ReturnUrl=%2f'>Click here</a> to check."; //+ Environment.NewLine;
                }


            }
            //listOfEmails.Add("richagomes1998@gmail.com");
            //First time tag Mail
            if (listOfEmails.Count > 0)
            {
                listOfEmails.Add(HttpContext.Session.GetString("UserEmail"));
                listOfEmails.Add(surveyCreationEmail);
                try
                {
                    using (MailMessage mm = new MailMessage())
                    {
                        mm.From = new MailAddress(mfromEmail);
                        //mm.To.Add(mfromEmail);
                        mm.Subject = "Survey Tag: " + surveyname;
                        mm.Body = tag;
                        mm.IsBodyHtml = true;
                        //string[] Multi = request.mToEmail.ToArray();
                        foreach (string Multimailid in listOfEmails)
                        {
                            mm.To.Add(new MailAddress(Multimailid));
                        }
                        //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                        //mm.To.Add(new MailAddress(info.EntryUser));
                        SmtpClient smtp = new SmtpClient();
                        smtp.Host = SMTPServer;
                        smtp.EnableSsl = EnableSSL_TrueFalse;
                        NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = NetworkCred;
                        smtp.Port = SMTP_Port;
                        smtp.Send(mm);
                        EmailStatus = "";
                        //return Ok(EmailStatus);
                    }
                }
                catch (Exception ex)
                {
                    EmailStatus = ex.Message.ToString();
                    //return Ok(EmailStatus);
                }
                finally { }
            }

            //Retag Mail
            if (listOfRetaggedEmails.Count > 0)
            {
                listOfRetaggedEmails.Add(HttpContext.Session.GetString("UserEmail"));
                listOfRetaggedEmails.Add(surveyCreationEmail);
                try
                {
                    using (MailMessage mm = new MailMessage())
                    {
                        mm.From = new MailAddress(mfromEmail);
                        //mm.To.Add(mfromEmail);
                        mm.Subject = "Survey Retag: " + surveyname;
                        mm.Body = retag;
                        mm.IsBodyHtml = true;
                        //string[] Multi = request.mToEmail.ToArray();
                        foreach (string Multimailid in listOfRetaggedEmails)
                        {
                            mm.To.Add(new MailAddress(Multimailid));
                        }
                        //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                        //mm.To.Add(new MailAddress(info.EntryUser));
                        SmtpClient smtp = new SmtpClient();
                        smtp.Host = SMTPServer;
                        smtp.EnableSsl = EnableSSL_TrueFalse;
                        NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = NetworkCred;
                        smtp.Port = SMTP_Port;
                        smtp.Send(mm);
                        EmailRetagStatus = "";
                        //return Ok(EmailStatus);
                    }
                }
                catch (Exception ex)
                {
                    EmailRetagStatus = ex.Message.ToString();
                    //return Ok(EmailStatus);
                }
                finally { }
            }
            //var a = mlist.Where(x => x.empno == info.Emp).ToList();
            //return Ok(x);
            if (d == null && EmailStatus == "" && EmailRetagStatus == "")
            {
                y = "";
            }
            else if (d != null)
            {
                y = d.ToString();
            }
            else if (EmailStatus != "")
            {
                y = EmailStatus;
            }
            else if (EmailRetagStatus != "")
            {
                y = EmailRetagStatus;
            }
            return Ok(y);
        }

        [HttpPost]
        [Route("SaveApprEmployeeLink")]
        public IActionResult Survey_Appraisee_Share_Emp(clsSurveyEmpShareInfo info, clsEmpInfo info2)
        {
            var listOfEmails = new List<string>();
            var apprseeEmail = "";
            var apprseeName = "";
            var surveyname = "";
            var surveyCreationEmail = "";
            var surveyTagUserEmail = HttpContext.Session.GetString("UserEmail");
            var surveyTagUserName = HttpContext.Session.GetString("UserName");
            string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            var d = clsSurveyCreation.Survey_Share_Emp(Con, info, info2);
            //var d = "";
            var y = "";
            List<clsEmpInfo> mlist = clsSurveyCreation.Employee_List(Con);
            List<clsSurveyCreationInfo> mlist1 = clsSurveyCreation.Survey_List_Active(Con);
            foreach (var item in info.EmpShare)
            {
                var x = mlist1.Where(x => x.IDSurvey == item.IDSurvey).ToList();
                surveyname = x[0].Name;
                surveyCreationEmail = x[0].EntryUser;
                //surveyCreationEmail = x[0].EntryUser;

                var a = mlist.Where(x => x.empno == item.EmpID).ToList();
                if (item.Appraisee == 0)
                {
                    apprseeEmail = a[0].empemail;
                    apprseeName = a[0].empfirstname+" "+ a[0].empmiddlename+" "+ a[0].emplastname;
                }
                else
                {
                    var empemail = a[0].empemail;
                    listOfEmails.Add(empemail);
                }
            }

            string SMTPServer = HttpContext.Session.GetString("SMTPServer");
            bool EnableSSL_TrueFalse = Convert.ToBoolean(HttpContext.Session.GetString("EnableSSL_TrueFalse"));
            string Username = HttpContext.Session.GetString("Username");
            string Password = HttpContext.Session.GetString("Password");
            int SMTP_Port = Convert.ToInt32(HttpContext.Session.GetString("SMTP_Port"));
            string mfromEmail = HttpContext.Session.GetString("mfromEmail");
            String textbody = "";

            //Appraisee Email
            textbody = "One survey for appraisal named: <b>" + surveyname + "</b> has been tagged to you.<br><a href='https://hrms.mendine.co.in/Account/Login.aspx?ReturnUrl=%2f'>Click here</a> to check."; //+ Environment.NewLine;
            string EmailapprseeStatus = "";
            try
            {
                using (MailMessage mm = new MailMessage())
                {
                    mm.From = new MailAddress(mfromEmail);
                    //mm.To.Add(mfromEmail);
                    mm.Subject = "Appraisal Survey Tag: " + surveyname;
                    mm.Body = textbody;
                    mm.IsBodyHtml = true;
                    //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                    mm.To.Add(new MailAddress(apprseeEmail));
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = SMTPServer;
                    smtp.EnableSsl = EnableSSL_TrueFalse;
                    NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = SMTP_Port;
                    smtp.Send(mm);
                    EmailapprseeStatus = "";
                    //return Ok(EmailapprseeStatus);
                }
            }
            catch (Exception ex)
            {
                EmailapprseeStatus = ex.Message.ToString();
                //return Ok(EmailapprseeStatus);
            }
            finally { }

            //Appraiser Email
            textbody = "One survey for appraisal named: <b>" + surveyname + "</b> has been tagged to <b>"+ apprseeName + "</b>.<br><a href='https://hrms.mendine.co.in/Account/Login.aspx?ReturnUrl=%2f'>Click here</a> to give response to this survey as Appraiser."; //+ Environment.NewLine;
            string EmailapprserStatus = "";
            try
            {
                using (MailMessage mm = new MailMessage())
                {
                    mm.From = new MailAddress(mfromEmail);
                    //mm.To.Add(mfromEmail);
                    mm.Subject = "Appraisal Survey Tag: " + surveyname;
                    mm.Body = textbody;
                    mm.IsBodyHtml = true;
                    //string[] Multi = request.mToEmail.ToArray();
                    foreach (string Multimailid in listOfEmails)
                    {
                        mm.To.Add(new MailAddress(Multimailid));
                    }
                    //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                    //mm.To.Add(new MailAddress(info.EntryUser));
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = SMTPServer;
                    smtp.EnableSsl = EnableSSL_TrueFalse;
                    NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = SMTP_Port;
                    smtp.Send(mm);
                    EmailapprserStatus = "";
                    //return Ok(EmailapprserStatus);
                }
            }
            catch (Exception ex)
            {
                EmailapprserStatus = ex.Message.ToString();
                //return Ok(EmailapprserStatus);
            }
            finally { }

            //Survey Creator Email
            textbody = "One survey for appraisal named: <b>" + surveyname + "</b> which was created by you, has been tagged by <b>"+ surveyTagUserName + "</b>.<br><a href='https://hrms.mendine.co.in/Account/Login.aspx?ReturnUrl=%2f'>Click here</a> to check."; //+ Environment.NewLine;
            string EmailcreatorStatus = "";
            try
            {
                using (MailMessage mm = new MailMessage())
                {
                    mm.From = new MailAddress(mfromEmail);
                    //mm.To.Add(mfromEmail);
                    mm.Subject = "Appraisal Survey Tag: " + surveyname;
                    mm.Body = textbody;
                    mm.IsBodyHtml = true;
                    //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                    mm.To.Add(new MailAddress(surveyCreationEmail));
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = SMTPServer;
                    smtp.EnableSsl = EnableSSL_TrueFalse;
                    NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = SMTP_Port;
                    smtp.Send(mm);
                    EmailcreatorStatus = "";
                    //return Ok(EmailcreatorStatus);
                }
            }
            catch (Exception ex)
            {
                EmailcreatorStatus = ex.Message.ToString();
                //return Ok(EmailcreatorStatus);
            }
            finally { }

            //Survey Tag User Email
            textbody = "One survey for appraisal named: <b>" + surveyname + "</b> has been successfully tagged by you.<br><a href='https://hrms.mendine.co.in/Account/Login.aspx?ReturnUrl=%2f'>Click here</a> to check."; //+ Environment.NewLine;
            string EmailTagStatus = "";
            try
            {
                using (MailMessage mm = new MailMessage())
                {
                    mm.From = new MailAddress(mfromEmail);
                    //mm.To.Add(mfromEmail);
                    mm.Subject = "Appraisal Survey Tag: " + surveyname;
                    mm.Body = textbody;
                    mm.IsBodyHtml = true;
                    //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                    mm.To.Add(new MailAddress(surveyTagUserEmail));
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = SMTPServer;
                    smtp.EnableSsl = EnableSSL_TrueFalse;
                    NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = SMTP_Port;
                    smtp.Send(mm);
                    EmailTagStatus = "";
                    //return Ok(EmailTagStatus);
                }
            }
            catch (Exception ex)
            {
                EmailTagStatus = ex.Message.ToString();
                //return Ok(EmailTagStatus);
            }
            finally { }

            if (d == null && EmailapprseeStatus == "" && EmailapprserStatus == "" && EmailcreatorStatus == "" && EmailTagStatus == "")
            {
                y = "";
            }
            else if (EmailapprseeStatus != "")
            {
                y = EmailapprseeStatus;
            }
            else if (EmailapprserStatus != "")
            {
                y = EmailapprserStatus;
            }
            else if (EmailcreatorStatus != "")
            {
                y = EmailcreatorStatus;
            }
            else if (EmailTagStatus != "")
            {
                y = EmailTagStatus;
            }
            else if (d==null)
            {
                y=d.ToString();
            }
            else
            {
                y = "Some Error Occured";
            }
            return Ok(y);
        }
    }
}
