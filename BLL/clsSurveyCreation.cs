using Survey.Models;
using Survey.BLL;
using Common.Utility;
using System.Data;
using System.Diagnostics.Metrics;
using System.Data.SqlClient;
using System;

namespace Survey.BLL
{
    public class clsSurveyCreation
    {
        public static String Survey_Save(String Con, clsSurveyCreationInfo info)
        {
            return clsDatabase.DBOperation(Con, "PRC_Survey_Add_Edit",
                                            info.IDSurvey, info.Name,
                                            info.StartDate, info.EndDate,
                                            info.Remarks, info.EntryUser, info.TotalMarks);
        }
        public static String Survey_Email_Link_Save(String Con, clsSendMail info, long info2)
        {
            //string Con = this.Configuration.GetConnectionString("SurveyAdmin");
            List<clsSurveyShareLink> mlist = clsSurveyCreation.Survey_List_ResponseAll(Con);
            var d = "";
            foreach (var item in info.mToEmail)
            {
                var x = mlist.Where(x => x.UserEmail == item && x.IDSurvey==info2).ToList();
                if (x.Count == 0)
                {
                    d = clsDatabase.DBOperation(Con, "PRC_Survey_Share_Link",
                                            item, info2);
                }
                else
                {
                    d = "Email already Exists";
                }
            }
            return d;
        }
        public static String Survey_Detail_Save(String Con, clsSurveyQuestionInfo info, clsSurveyCreationInfo info2)
        {
            DataTable survey_detailDT = DTSurvey_Detail();
            foreach (var item in info.Questions)
            {
                DataRow DR = survey_detailDT.NewRow();
                DR["QuestionNo"] = item.QuestionNo;
                DR["IDSurvey"] = item.IDSurvey;
                DR["FormTitle"] = item.FormTitle;
                DR["FormDesc"] = item.FormDesc;
                DR["Marks"] = item.Marks;
                DR["Timer"] = item.Time;
                DR["QuestionType"] = item.QuestionType;
                DR["QuestionText"] = item.QuestionText;
                DR["QuestionDesc"] = item.QuestionDesc;
                DR["AnswerType"] = item.AnswerType;
                DR["AnswerText"] = item.AnswerText;
                DR["AnswerTextMarks"] = item.AnswerTextMarks;
                DR["AnswerTextArea"] = item.AnswerTextArea;
                DR["AnswerTextAreaMarks"] = item.AnswerTextAreaMarks;
                DR["AnswerCheckbox1"] = item.AnswerCheckbox1;
                DR["AnswerCheckbox2"] = item.AnswerCheckbox2;
                DR["AnswerCheckbox3"] = item.AnswerCheckbox3;
                DR["AnswerCheckbox4"] = item.AnswerCheckbox4;
                DR["AnswerCheckboxText1"] = item.AnswerCheckboxText1;
                DR["AnswerCheckboxText2"] = item.AnswerCheckboxText2;
                DR["AnswerCheckboxText3"] = item.AnswerCheckboxText3;
                DR["AnswerCheckboxText4"] = item.AnswerCheckboxText4;
                DR["AnswerCheckbox1Marks"] = item.AnswerCheckbox1Marks;
                DR["AnswerCheckbox2Marks"] = item.AnswerCheckbox2Marks;
                DR["AnswerCheckbox3Marks"] = item.AnswerCheckbox3Marks;
                DR["AnswerCheckbox4Marks"] = item.AnswerCheckbox4Marks;
                DR["AnswerRadio1"] = item.AnswerRadio1;
                DR["AnswerRadio2"] = item.AnswerRadio2;
                DR["AnswerRadio3"] = item.AnswerRadio3;
                DR["AnswerRadio4"] = item.AnswerRadio4;
                DR["AnswerRadioText1"] = item.AnswerRadioText1;
                DR["AnswerRadioText2"] = item.AnswerRadioText2;
                DR["AnswerRadioText3"] = item.AnswerRadioText3;
                DR["AnswerRadioText4"] = item.AnswerRadioText4;
                DR["AnswerRadio1Marks"] = item.AnswerRadio1Marks;
                DR["AnswerRadio2Marks"] = item.AnswerRadio2Marks;
                DR["AnswerRadio3Marks"] = item.AnswerRadio3Marks;
                DR["AnswerRadio4Marks"] = item.AnswerRadio4Marks;
                DR["LinearScale"] = item.LinearScale;
                DR["LinearScaleLow"] = item.LinearScaleLow;
                DR["LinearScaleLowLabel"] = item.LinearScaleLowLabel;
                DR["LinearScaleHigh"] = item.LinearScaleHigh;
                DR["LinearScaleHighLabel"] = item.LinearScaleHighLabel;
                DR["LinearScaleMarks"] = item.LinearScaleMarks;
                DR["EntryUser"] = item.EntryUser;
                //DR["UpdateUser"] = item.UpdateUser;
                survey_detailDT.Rows.Add(DR);
            }
            //return "";
            return clsDatabase.DBOperation(Con, "PRC_Survey_Detail_Add_Edit", survey_detailDT, info2.TotalMarks, info2.Timer, info2.IDCategory);
        }
        public static String Survey_Check_Detail_Info(String Con, clsSurveyDetailInfo info)
        {
            //string sql = "PRC_Survey_Check_Detail_Info";
            using (SqlConnection con = new SqlConnection(Con))
            {
                using (SqlCommand cmd = new SqlCommand("PRC_Survey_Check_Detail_Info"))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idSurvey", info.IDSurvey);
                    cmd.Parameters.Add("@status", SqlDbType.VarChar, 10);
                    cmd.Parameters["@status"].Direction = ParameterDirection.Output;
                    cmd.Connection = con;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                    string msg1 = cmd.Parameters["@status"].Value.ToString();
                    return msg1;
                }
            }
        }
        private static List<clsSurveyDetailInfo> Survey_Question_List(String Con)
        {
            List<clsSurveyDetailInfo> mlist = new List<clsSurveyDetailInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_Question_List");
            foreach (DataRow dr in DT.Rows)
            {
                clsSurveyDetailInfo obj = new clsSurveyDetailInfo();
                obj.IDSurvey = clsHelper.fnConvert2Long(dr["IDSurvey"]);
                obj.QuestionNo = clsHelper.fnConvert2Long(dr["QuestionNo"]);
                obj.QuestionType = dr["QuestionType"].ToString();
                obj.QuestionText = dr["QuestionText"].ToString();
                obj.QuestionDesc = dr["QuestionDesc"].ToString();
                obj.AnswerType = dr["AnswerType"].ToString();
                obj.AnswerText = (Boolean)dr["AnswerText"];
                obj.AnswerTextMarks = clsHelper.fnConvert2Long(dr["AnswerTextMarks"]);
                obj.AnswerTextArea = (Boolean)dr["AnswerTextArea"];
                obj.AnswerTextAreaMarks = clsHelper.fnConvert2Long(dr["AnswerTextAreaMarks"]);
                obj.AnswerCheckbox1 = (Boolean)dr["CheckBox1"];
                obj.AnswerCheckbox2 = (Boolean)dr["CheckBox2"];
                obj.AnswerCheckbox3 = (Boolean)dr["CheckBox3"];
                obj.AnswerCheckbox4 = (Boolean)dr["CheckBox4"];
                obj.AnswerCheckboxText1 = dr["CheckBox1Text"].ToString();
                obj.AnswerCheckboxText2 = dr["CheckBox2Text"].ToString();
                obj.AnswerCheckboxText3 = dr["CheckBox3Text"].ToString();
                obj.AnswerCheckboxText4 = dr["CheckBox4Text"].ToString();
                obj.AnswerCheckbox1Marks = clsHelper.fnConvert2Long(dr["CheckBox1Marks"]);
                obj.AnswerCheckbox2Marks = clsHelper.fnConvert2Long(dr["CheckBox2Marks"]);
                obj.AnswerCheckbox3Marks = clsHelper.fnConvert2Long(dr["CheckBox3Marks"]);
                obj.AnswerCheckbox4Marks = clsHelper.fnConvert2Long(dr["CheckBox4Marks"]);
                obj.AnswerRadio1 = (Boolean)dr["RadioBox1"];
                obj.AnswerRadio2 = (Boolean)dr["RadioBox2"];
                obj.AnswerRadio3 = (Boolean)dr["RadioBox3"];
                obj.AnswerRadio4 = (Boolean)dr["RadioBox4"];
                obj.AnswerRadioText1 = dr["Radio1Text"].ToString();
                obj.AnswerRadioText2 = dr["Radio2Text"].ToString();
                obj.AnswerRadioText3 = dr["Radio3Text"].ToString();
                obj.AnswerRadioText4 = dr["Radio4Text"].ToString();
                obj.AnswerRadio1Marks = clsHelper.fnConvert2Long(dr["RadioBox1Marks"]);
                obj.AnswerRadio2Marks = clsHelper.fnConvert2Long(dr["RadioBox2Marks"]);
                obj.AnswerRadio3Marks = clsHelper.fnConvert2Long(dr["RadioBox3Marks"]);
                obj.AnswerRadio4Marks = clsHelper.fnConvert2Long(dr["RadioBox4Marks"]);
                obj.LinearScale = (Boolean)dr["LinearScale"];
                obj.LinearScaleLow = clsHelper.fnConvert2Long(dr["LinearScaleLow"]);
                obj.LinearScaleLowLabel = dr["LinearScaleLowLabel"].ToString();
                obj.LinearScaleHigh = clsHelper.fnConvert2Long(dr["LinearScaleHigh"]);
                obj.LinearScaleHighLabel = dr["LinearScaleHighLabel"].ToString();
                obj.LinearScaleMarks = clsHelper.fnConvert2Long(dr["LinearScaleMarks"]);
                mlist.Add(obj);
            }
            return mlist;
        }
        public static List<clsSurveyDetailInfo> Survey_Detail_Show(String Con, clsSurveyDetailInfo info)
        {
            List<clsSurveyDetailInfo> mlist = Survey_Question_List(Con);
            return mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
        }
        private static List<clsSurveyType> Survey_Type_All(String Con)
        {
            List<clsSurveyType> mlist = new List<clsSurveyType>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_SURVEY_CATEGORY");
            foreach (DataRow dr in DT.Rows)
            {
                clsSurveyType obj = new clsSurveyType();
                obj.IDCategory = clsHelper.fnConvert2Long(dr["IDCategory"]);
                obj.Code = dr["Code"].ToString();
                obj.Name = dr["Name"].ToString();
                obj.Description = dr["Description"].ToString();
                obj.Active = (Boolean)dr["Active"];
                mlist.Add(obj);
            }
            return mlist;
        }
        public static List<clsSurveyType> Survey_Type_Active(String Con)
        {
            List<clsSurveyType> mlist = Survey_Type_All(Con);
            return mlist.Where(x => x.Active == true).ToList();
        }
        public static List<clsAutonoInfo> Survey_Autono_Generation(String Con)
        {
            List<clsAutonoInfo> mlist = new List<clsAutonoInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_Autono_Generation");
            foreach (DataRow dr in DT.Rows)
            {
                clsAutonoInfo obj = new clsAutonoInfo();
                obj.No = dr["Code"].ToString();
                obj.Autono = clsHelper.fnConvert2Long(dr["Autono"]);
                obj.Prefix= dr["Prefix"].ToString();
                obj.Year = dr["Year"].ToString();
                mlist.Add(obj);
            }
            return mlist;
        }
        public static List<clsAutonoInfo> Survey_Max_No(String Con)
        {
            List<clsAutonoInfo> mlist = new List<clsAutonoInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_Max_No");
            foreach (DataRow dr in DT.Rows)
            {
                clsAutonoInfo obj = new clsAutonoInfo();
                obj.Autono = clsHelper.fnConvert2Long(dr["MaxNo"]);
                obj.Year = dr["Year"].ToString();
                obj.Prefix = dr["Prefix"].ToString();
                mlist.Add(obj);
            }
            return mlist;
        }
        public static String Survey_Remove(String Con, long IDSurvey, String EntryUser)
        {
            return clsDatabase.DBOperation(Con, "PRC_Survey_Remove", IDSurvey, EntryUser);
        }
        public static String Survey_Publish(String Con, long IDSurvey, String EntryUser)
        {
            return clsDatabase.DBOperation(Con, "PRC_Survey_Publish", IDSurvey, EntryUser);
        }
        public static String Survey_UnPublish(String Con, long IDSurvey, String EntryUser)
        {
            return clsDatabase.DBOperation(Con, "PRC_Survey_UnPublish", IDSurvey, EntryUser);
        }
        private static List<clsSurveyCreationInfo> Survey_List(String Con)
        {
            List<clsSurveyCreationInfo> mlist = new List<clsSurveyCreationInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_List");
            foreach (DataRow dr in DT.Rows)
            {
                clsSurveyCreationInfo obj = new clsSurveyCreationInfo();
                obj.IDSurvey = clsHelper.fnConvert2Long(dr["IDSurvey"]);
                obj.Code = dr["NO"].ToString();
                obj.Autono = clsHelper.fnConvert2Long(dr["AutoNo"]);
                obj.Name = dr["Name"].ToString();
                obj.Remarks = dr["Remarks"].ToString();
                obj.SurveyGUID = dr["SurveyGUID"].ToString();
                obj.StartDate = dr["StartDate"].ToString();
                obj.EndDate = dr["EndDate"].ToString();
                obj.Active = (Boolean)dr["Active"];
                obj.Publish = (Boolean)dr["Publish"];
                obj.Timer = clsHelper.fnConvert2Long(dr["Timer"]);
                obj.TotalMarks = clsHelper.fnConvert2Long(dr["TotalMarks"]);
                obj.IDCategory = clsHelper.fnConvert2Long(dr["IDCategory"]);
                obj.EntryUser = dr["EntryUser"].ToString();
                mlist.Add(obj);
            }
            return mlist;
        }
        public static List<clsSurveyCreationInfo> Survey_List_All(String Con)
        {
            List<clsSurveyCreationInfo> mlist = Survey_List(Con);
            return mlist;
        }
        public static List<clsSurveyCreationInfo> Survey_List_Active(String Con)
        {
            List<clsSurveyCreationInfo> mlist = Survey_List(Con);
            return mlist.Where(x => x.Active == true).ToList();
        }
        public static List<clsSurveyCreationInfo> Survey_List_INActive(String Con)
        {
            List<clsSurveyCreationInfo> mlist = Survey_List(Con);
            return mlist.Where(x => x.Active == false).ToList();
        }
        public static List<clsQuestionTypeInfo> Question_Type_List(String Con)
        {
            List<clsQuestionTypeInfo> mlist = new List<clsQuestionTypeInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Suvey_Misc_List", "QUESTIONTYPE");
            foreach (DataRow dr in DT.Rows)
            {
                clsQuestionTypeInfo obj = new clsQuestionTypeInfo();
                obj.IDType = clsHelper.fnConvert2Long(dr["IDMisc"]);
                obj.Name = (String)dr["Name"];
                mlist.Add(obj);
            }
            return mlist;

        }
        public static List<clsAnswerTypeInfo> Answer_Type_List(String Con)
        {
            List<clsAnswerTypeInfo> mlist = new List<clsAnswerTypeInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Suvey_Misc_List", "ANSWERTYPE");
            foreach (DataRow dr in DT.Rows)
            {
                clsAnswerTypeInfo obj = new clsAnswerTypeInfo();
                obj.IDType = clsHelper.fnConvert2Long(dr["IDMisc"]);
                obj.Name = (String)dr["Name"];
                mlist.Add(obj);
            }
            return mlist;
        }
        public static List<clsSurveyCreationInfo> Survey_GUID(String Con, long IDSurvey)
        {
            List<clsSurveyCreationInfo> mlist = Survey_List(Con);
            return mlist.Where(x => x.IDSurvey == IDSurvey).ToList();
        }
        public static List<clsSurveyShareLink> Survey_List_ResponseAll(String Con)
        {
            List<clsSurveyShareLink> mlist = Survey_Response(Con);
            return mlist;
        }
        public static List<clsSurveyShareLink> Survey_List_Response_Active(String Con)
        {
            List<clsSurveyShareLink> mlist = Survey_List_ResponseAll(Con);
            return mlist.Where(x => x.Response == true).ToList();
        }
        public static List<clsSurveyShareLink> Survey_List_Response_INActive(String Con)
        {
            List<clsSurveyShareLink> mlist = Survey_List_ResponseAll(Con);
            return mlist.Where(x => x.Response == false).ToList();
        }
        private static List<clsSurveyShareLink> Survey_Response(String Con)
        {
            List<clsSurveyShareLink> mlist = new List<clsSurveyShareLink>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_Email_Response");
            foreach (DataRow dr in DT.Rows)
            {
                clsSurveyShareLink obj = new clsSurveyShareLink();
                obj.UserEmail = dr["UserEmail"].ToString();
                obj.UserName = dr["UserName"].ToString();
                obj.IDSurvey = clsHelper.fnConvert2Long(dr["IDSurvey"]);
                obj.Response = (Boolean)dr["Response"];
                obj.TotalMarksResult = clsHelper.fnConvert2Long(dr["TotalMarksResult"]);
                mlist.Add(obj);
            }
            return mlist;
        }

        public static List<clsDeptInfo> Department_List(String Con)
        {
            List<clsDeptInfo> mlist = new List<clsDeptInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_Department_List");
            foreach (DataRow dr in DT.Rows)
            {
                clsDeptInfo obj = new clsDeptInfo();
                obj.DepartmentId = (Int32)dr["DepartmentId"];
                obj.Department = (String)dr["Department"];
                mlist.Add(obj);
            }
            return mlist;
        }
        public static List<clsEmpInfo> Employee_List(String Con)
        {
            List<clsEmpInfo> mlist = new List<clsEmpInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_Employee_List");
            foreach (DataRow dr in DT.Rows)
            {
                clsEmpInfo obj = new clsEmpInfo();
                obj.empno = (Int32)dr["empno"];
                obj.empdept = (Int32)dr["empdept"];
                obj.empfirstname = (String)dr["empfirstname"];
                obj.empmiddlename = (String)dr["empmiddlename"];
                obj.emplastname = (String)dr["emplastname"];
                obj.empemail = dr["empemail"].ToString();
                mlist.Add(obj);
            }
            return mlist;
        }

        public static String Survey_Share_Emp(String Con, clsSurveyEmpShareInfo info, clsEmpInfo info2)
        {
            List<clsEmpInfo> mlist = Employee_List(Con);
            DataTable survey_shareempDT = DTSurvey_Emp_Share();
            foreach (var item in info.EmpShare)
            {
                var y = mlist.Where(x => x.empno == item.EmpID).ToList();
                DataRow DR = survey_shareempDT.NewRow();
                DR["EmpID"] = item.EmpID;
                DR["DeptID"] = y[0].empdept;
                DR["IDSurvey"] = item.IDSurvey;
                DR["Retag"] = item.Retag;
                DR["Appraisee"] = item.Appraisee;

                survey_shareempDT.Rows.Add(DR);
            }
            //var boolRetag = info2.Retag;
            //return "";
            return clsDatabase.DBOperation(Con, "PRC_Survey_Emp_Share", survey_shareempDT, info2.empemail);
        }
        public static String Survey_Share_Emp_Check(String Con, clsSurveyEmpShareInfo info)
        {
            List<clsEmpInfo> mlist = Employee_List(Con);
            DataTable survey_shareempDT = DTSurvey_Emp_Share();
            var d = "";
            //var empID = "";
            foreach (var item in info.EmpShare)
            {
                var y = mlist.Where(x => x.empno == item.EmpID).ToList();
                DataRow DR = survey_shareempDT.NewRow();
                DR["EmpID"] = item.EmpID;
                DR["DeptID"] = y[0].empdept;
                DR["IDSurvey"] = item.IDSurvey;
                DR["Retag"] = item.Retag;

                survey_shareempDT.Rows.Add(DR);
                d = clsDatabase.DBOperation(Con, "PRC_Survey_Emp_Share_Check", survey_shareempDT);
                if (d == "1")
                {
                    d = item.EmpID.ToString();
                    break;
                }
                else if (d == "2")
                {
                    break;
                }
                else
                {
                    continue;
                }
            }
            return d;
            //return clsDatabase.DBOperation(Con, "PRC_Survey_Emp_Share_Check", survey_shareempDT);
        }

        private static DataTable DTSurvey_Detail()
        {
            DataTable DT = new DataTable();
            DT.Columns.Add("QuestionNo", typeof(System.Int64));
            DT.Columns.Add("IDSurvey", typeof(System.Int64));
            DT.Columns.Add("FormTitle", typeof(System.String));
            DT.Columns.Add("FormDesc", typeof(System.String));
            DT.Columns.Add("Marks", typeof(System.Decimal));
            DT.Columns.Add("Timer", typeof(System.Decimal));
            DT.Columns.Add("QuestionType", typeof(System.String));
            DT.Columns.Add("QuestionText", typeof(System.String));
            DT.Columns.Add("QuestionDesc", typeof(System.String));
            DT.Columns.Add("AnswerType", typeof(System.String));
            DT.Columns.Add("AnswerText", typeof(System.Boolean));
            DT.Columns.Add("AnswerTextMarks", typeof(System.Int64));
            DT.Columns.Add("AnswerTextArea", typeof(System.Boolean));
            DT.Columns.Add("AnswerTextAreaMarks", typeof(System.Int64));
            DT.Columns.Add("AnswerCheckbox1", typeof(System.Boolean));
            DT.Columns.Add("AnswerCheckbox2", typeof(System.Boolean));
            DT.Columns.Add("AnswerCheckbox3", typeof(System.Boolean));
            DT.Columns.Add("AnswerCheckbox4", typeof(System.Boolean));
            DT.Columns.Add("AnswerCheckboxText1", typeof(System.String));
            DT.Columns.Add("AnswerCheckboxText2", typeof(System.String));
            DT.Columns.Add("AnswerCheckboxText3", typeof(System.String));
            DT.Columns.Add("AnswerCheckboxText4", typeof(System.String));
            DT.Columns.Add("AnswerCheckbox1Marks", typeof(System.Int64));
            DT.Columns.Add("AnswerCheckbox2Marks", typeof(System.Int64));
            DT.Columns.Add("AnswerCheckbox3Marks", typeof(System.Int64));
            DT.Columns.Add("AnswerCheckbox4Marks", typeof(System.Int64));
            DT.Columns.Add("AnswerRadio1", typeof(System.Boolean));
            DT.Columns.Add("AnswerRadio2", typeof(System.Boolean));
            DT.Columns.Add("AnswerRadio3", typeof(System.Boolean));
            DT.Columns.Add("AnswerRadio4", typeof(System.Boolean));
            DT.Columns.Add("AnswerRadioText1", typeof(System.String));
            DT.Columns.Add("AnswerRadioText2", typeof(System.String));
            DT.Columns.Add("AnswerRadioText3", typeof(System.String));
            DT.Columns.Add("AnswerRadioText4", typeof(System.String));
            DT.Columns.Add("AnswerRadio1Marks", typeof(System.Int64));
            DT.Columns.Add("AnswerRadio2Marks", typeof(System.Int64));
            DT.Columns.Add("AnswerRadio3Marks", typeof(System.Int64));
            DT.Columns.Add("AnswerRadio4Marks", typeof(System.Int64));
            DT.Columns.Add("LinearScale", typeof(System.Boolean));
            DT.Columns.Add("LinearScaleLow", typeof(System.Int64));
            DT.Columns.Add("LinearScaleLowLabel", typeof(System.String));
            DT.Columns.Add("LinearScaleHigh", typeof(System.Int64));
            DT.Columns.Add("LinearScaleHighLabel", typeof(System.String));
            DT.Columns.Add("LinearScaleMarks", typeof(System.Int64));
            DT.Columns.Add("EntryUser", typeof(System.String));
            return DT;
        }
        private static DataTable DTSurvey_Emp_Share()
        {
            DataTable DT = new DataTable();
            DT.Columns.Add("EmpID", typeof(System.Int64));
            DT.Columns.Add("DeptID", typeof(System.Int64));
            DT.Columns.Add("IDSurvey", typeof(System.Int64));
            DT.Columns.Add("Retag", typeof(System.Boolean));
            DT.Columns.Add("Appraisee", typeof(System.Int64));
            return DT;
        }
    }
}
