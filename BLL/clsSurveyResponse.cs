using Common.Utility;
using Survey.Models;
using System.Data;

namespace Survey.BLL
{
    public class clsSurveyResponse
    {
        public static List<clsSurveyResponseInfo> Survey_View_User_Response(String Con, clsSurveyShareLink info)
        {
            List<clsSurveyResponseInfo> mlist = Survey_Response_List(Con);
            return mlist.Where(x => x.IDSurvey == info.IDSurvey && x.UserEmail == info.UserEmail).ToList();
        }
        public static List<clsSurveyResponseInfo> Survey_View_Emp_Response(String Con, clsSurveyEmpShareLink info)
        {
            List<clsSurveyResponseInfo> mlist = Survey_Response_List(Con);
            return mlist.Where(x => x.IDSurvey == info.IDSurvey && x.UserID == info.EmpID && x.Retag == info.Retag).ToList();
        }
        public static List<clsSurveyResponseInfo> Survey_View_Emp_Response_All(String Con, clsSurveyCreationInfo info)
        {
            List<clsSurveyResponseInfo> mlist = Survey_Response_List(Con);
            return mlist.Where(x => x.IDSurvey == info.IDSurvey).ToList();
        }
        private static List<clsSurveyResponseInfo> Survey_Response_List(String Con)
        {
            List<clsSurveyResponseInfo> mlist = new List<clsSurveyResponseInfo>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_Response");
            foreach (DataRow dr in DT.Rows)
            {
                clsSurveyResponseInfo obj = new clsSurveyResponseInfo();
                obj.IDSurvey = clsHelper.fnConvert2Long(dr["IDSurvey"]);
                obj.UserName = dr["UserName"].ToString();
                obj.UserEmail = dr["UserEmail"].ToString();
                obj.UserID = clsHelper.fnConvert2Long(dr["UserID"]);
                obj.Retag = (Boolean)dr["Retag"];
                obj.QuestionNo = clsHelper.fnConvert2Long(dr["QuestionNo"]);
                obj.AnswerText = dr["AnswerText"].ToString();
                obj.AnswerTextMarksResult = clsHelper.fnConvert2Long(dr["AnswerTextMarksResult"]);
                obj.AnswerTextArea = dr["AnswerTextArea"].ToString();
                obj.AnswerTextAreaMarksResult = clsHelper.fnConvert2Long(dr["AnswerTextAreaMarksResult"]);
                obj.AnswerCheckbox1 = (Boolean)dr["CheckBox1"];
                obj.AnswerCheckbox2 = (Boolean)dr["CheckBox2"];
                obj.AnswerCheckbox3 = (Boolean)dr["CheckBox3"];
                obj.AnswerCheckbox4 = (Boolean)dr["CheckBox4"];
                obj.AnswerCheckboxText1 = dr["CheckBox1Text"].ToString();
                obj.AnswerCheckboxText2 = dr["CheckBox2Text"].ToString();
                obj.AnswerCheckboxText3 = dr["CheckBox3Text"].ToString();
                obj.AnswerCheckboxText4 = dr["CheckBox4Text"].ToString();
                obj.AnswerCheckbox1MarksResult = clsHelper.fnConvert2Long(dr["CheckBox1MarksResult"]);
                obj.AnswerCheckbox2MarksResult = clsHelper.fnConvert2Long(dr["CheckBox2MarksResult"]);
                obj.AnswerCheckbox3MarksResult = clsHelper.fnConvert2Long(dr["CheckBox3MarksResult"]);
                obj.AnswerCheckbox4MarksResult = clsHelper.fnConvert2Long(dr["CheckBox4MarksResult"]);
                obj.CheckBoxRemarks = dr["CheckBoxRemarks"].ToString();
                obj.AnswerRadio = (Boolean)dr["RadioBox"];
                obj.AnswerRadioText = dr["RadioText"].ToString();
                obj.AnswerRadioMarksResult = clsHelper.fnConvert2Long(dr["RadioMarks"]);
                obj.RadioRemarks = dr["RadioRemarks"].ToString();
                obj.LinearScale = (Boolean)dr["LinearScale"];
                obj.LinearScaleResp = clsHelper.fnConvert2Long(dr["LinearScaleResp"]);
                obj.LinearScaleRemarks = dr["LinearScaleRemarks"].ToString();
                obj.LinearScaleMarksResult = clsHelper.fnConvert2Long(dr["LinearScaleMarksResult"]);
                //obj.TotalMarksResult = clsHelper.fnConvert2Long(dr["TotalMarksResult"]);
                mlist.Add(obj);
            }
            return mlist;
        }
    }
}
