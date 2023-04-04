using Survey.Models;
using Survey.BLL;
using Common.Utility;
using System.Data;
using System.Diagnostics.Metrics;
using System.Data.SqlClient;

namespace Survey.BLL
{
    public class clsUserSurveyForm
    {
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
        public static List<clsSurveyDetailInfo> Survey_Detail_Show(String Con, clsSurveyCreationInfo info1)
        {
            List<clsSurveyDetailInfo> mlist = Survey_Question_List(Con);
            var d = Survey_List_Active(Con, info1);
            return mlist.Where(x => x.IDSurvey == d[0].IDSurvey).ToList();
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
                mlist.Add(obj);
            }
            return mlist;
        }
        public static List<clsSurveyCreationInfo> Survey_List_Active(String Con, clsSurveyCreationInfo info)
        {
            List<clsSurveyCreationInfo> mlist = Survey_List(Con);
            return mlist.Where(x => x.SurveyGUID == info.SurveyGUID).ToList();
        }
        public static String Survey_Save_Response(String Con, clsSurveySaveResponse info, clsSurveyShareLink info2)
        {
            DataTable survey_responseDT = DTSurvey_Response();
            foreach (var item in info.UserResponse)
            {
                DataRow DR = survey_responseDT.NewRow();
                DR["IDSurvey"] = item.IDSurvey;
                DR["UserName"] = item.UserName;
                DR["UserEmail"] = item.UserEmail;
                DR["UserID"] = item.UserID;
                DR["QuestionNo"] = item.QuestionNo;
                DR["AnswerText"] = item.AnswerText;
                DR["AnswerTextMarksResult"] = item.AnswerTextMarksResult;
                DR["AnswerTextArea"] = item.AnswerTextArea;
                DR["AnswerTextAreaMarksResult"] = item.AnswerTextAreaMarksResult;
                DR["AnswerCheckbox1"] = item.AnswerCheckbox1;
                DR["AnswerCheckbox2"] = item.AnswerCheckbox2;
                DR["AnswerCheckbox3"] = item.AnswerCheckbox3;
                DR["AnswerCheckbox4"] = item.AnswerCheckbox4;
                DR["AnswerCheckboxText1"] = item.AnswerCheckboxText1;
                DR["AnswerCheckboxText2"] = item.AnswerCheckboxText2;
                DR["AnswerCheckboxText3"] = item.AnswerCheckboxText3;
                DR["AnswerCheckboxText4"] = item.AnswerCheckboxText4;
                DR["AnswerCheckbox1MarksResult"] = item.AnswerCheckbox1MarksResult;
                DR["AnswerCheckbox2MarksResult"] = item.AnswerCheckbox2MarksResult;
                DR["AnswerCheckbox3MarksResult"] = item.AnswerCheckbox3MarksResult;
                DR["AnswerCheckbox4MarksResult"] = item.AnswerCheckbox4MarksResult;
                DR["AnswerRadio"] = item.AnswerRadio;
                DR["AnswerRadioText"] = item.AnswerRadioText;
                DR["AnswerRadioMarksResult"] = item.AnswerRadioMarksResult;
                //DR["TotalMarksResult"] = item.TotalMarksResult;

                survey_responseDT.Rows.Add(DR);
            }
            //return "";
            return clsDatabase.DBOperation(Con, "PRC_Survey_Response_Add", survey_responseDT, info2.TotalMarksResult);
        }

        public static String Survey_Emp_Save_Response(String Con, clsSurveySaveResponse info, clsSurveyEmpShareLink info2)
        {
            DataTable survey_responseDT = DTSurvey_Response();
            foreach (var item in info.UserResponse)
            {
                DataRow DR = survey_responseDT.NewRow();
                DR["IDSurvey"] = item.IDSurvey;
                DR["UserName"] = item.UserName;
                DR["UserEmail"] = item.UserEmail;
                DR["UserID"] = item.UserID;
                DR["Retag"] = item.Retag;
                DR["QuestionNo"] = item.QuestionNo;
                DR["AnswerText"] = item.AnswerText;
                DR["AnswerTextMarksResult"] = item.AnswerTextMarksResult;
                DR["AnswerTextArea"] = item.AnswerTextArea;
                DR["AnswerTextAreaMarksResult"] = item.AnswerTextAreaMarksResult;
                DR["AnswerCheckbox1"] = item.AnswerCheckbox1;
                DR["AnswerCheckbox2"] = item.AnswerCheckbox2;
                DR["AnswerCheckbox3"] = item.AnswerCheckbox3;
                DR["AnswerCheckbox4"] = item.AnswerCheckbox4;
                DR["AnswerCheckboxText1"] = item.AnswerCheckboxText1;
                DR["AnswerCheckboxText2"] = item.AnswerCheckboxText2;
                DR["AnswerCheckboxText3"] = item.AnswerCheckboxText3;
                DR["AnswerCheckboxText4"] = item.AnswerCheckboxText4;
                DR["AnswerCheckbox1MarksResult"] = item.AnswerCheckbox1MarksResult;
                DR["AnswerCheckbox2MarksResult"] = item.AnswerCheckbox2MarksResult;
                DR["AnswerCheckbox3MarksResult"] = item.AnswerCheckbox3MarksResult;
                DR["AnswerCheckbox4MarksResult"] = item.AnswerCheckbox4MarksResult;
                DR["CheckBoxRemarks"] = item.CheckBoxRemarks;
                DR["AnswerRadio"] = item.AnswerRadio;
                DR["AnswerRadioText"] = item.AnswerRadioText;
                DR["AnswerRadioMarksResult"] = item.AnswerRadioMarksResult;
                DR["RadioRemarks"] = item.RadioRemarks;
                DR["LinearScale"] = item.LinearScale;
                DR["LinearScaleResp"] = item.LinearScaleResp;
                DR["LinearScaleRemarks"] = item.LinearScaleRemarks;
                DR["LinearScaleMarksResult"] = item.LinearScaleMarksResult;
                //DR["TotalMarksResult"] = item.TotalMarksResult;

                survey_responseDT.Rows.Add(DR);
            }
            //return "";
            return clsDatabase.DBOperation(Con, "PRC_Survey_Emp_Response_Add", survey_responseDT, info2.TotalMarksResult);
        }

        private static DataTable DTSurvey_Response()
        {
            DataTable DT = new DataTable();
            DT.Columns.Add("IDSurvey", typeof(System.Int64));
            DT.Columns.Add("UserName", typeof(System.String));
            DT.Columns.Add("UserEmail", typeof(System.String));
            DT.Columns.Add("UserID", typeof(System.Int64));
            DT.Columns.Add("Retag", typeof(System.Boolean));
            DT.Columns.Add("QuestionNo", typeof(System.Int64));
            DT.Columns.Add("AnswerText", typeof(System.String));
            DT.Columns.Add("AnswerTextMarksResult", typeof(System.Int64));
            DT.Columns.Add("AnswerTextArea", typeof(System.String));
            DT.Columns.Add("AnswerTextAreaMarksResult", typeof(System.Int64));
            DT.Columns.Add("AnswerCheckbox1", typeof(System.Boolean));
            DT.Columns.Add("AnswerCheckbox2", typeof(System.Boolean));
            DT.Columns.Add("AnswerCheckbox3", typeof(System.Boolean));
            DT.Columns.Add("AnswerCheckbox4", typeof(System.Boolean));
            DT.Columns.Add("AnswerCheckboxText1", typeof(System.String));
            DT.Columns.Add("AnswerCheckboxText2", typeof(System.String));
            DT.Columns.Add("AnswerCheckboxText3", typeof(System.String));
            DT.Columns.Add("AnswerCheckboxText4", typeof(System.String));
            DT.Columns.Add("AnswerCheckbox1MarksResult", typeof(System.Int64));
            DT.Columns.Add("AnswerCheckbox2MarksResult", typeof(System.Int64));
            DT.Columns.Add("AnswerCheckbox3MarksResult", typeof(System.Int64));
            DT.Columns.Add("AnswerCheckbox4MarksResult", typeof(System.Int64));
            DT.Columns.Add("CheckBoxRemarks", typeof(System.String));
            DT.Columns.Add("AnswerRadio", typeof(System.Boolean));
            DT.Columns.Add("AnswerRadioText", typeof(System.String));
            DT.Columns.Add("AnswerRadioMarksResult", typeof(System.Int64));
            DT.Columns.Add("RadioRemarks", typeof(System.String));
            DT.Columns.Add("LinearScale", typeof(System.Boolean));
            DT.Columns.Add("LinearScaleResp", typeof(System.Int64));
            DT.Columns.Add("LinearScaleRemarks", typeof(System.String));
            DT.Columns.Add("LinearScaleMarksResult", typeof(System.Int64));
            //DT.Columns.Add("TotalMarksResult", typeof(System.Int64));
            return DT;
        }
    }
}
