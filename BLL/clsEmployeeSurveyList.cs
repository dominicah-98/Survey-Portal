using Common.Utility;
using Survey.Models;
using System.Data;

namespace Survey.BLL
{
    public class clsEmployeeSurveyList
    {
        public static List<clsSurveyEmpShareLink> Employee_Survey_List(String Con)
        {
            List<clsSurveyEmpShareLink> mlist = new List<clsSurveyEmpShareLink>();
            DataTable DT = clsDatabase.DataTable(Con, "PRC_Survey_Employee_Tagged_Survey");
            foreach (DataRow dr in DT.Rows)
            {
                clsSurveyEmpShareLink obj = new clsSurveyEmpShareLink();
                obj.EmpID = clsHelper.fnConvert2Long(dr["EmpID"]);
                obj.DeptID = clsHelper.fnConvert2Long(dr["DeptID"]);
                obj.IDSurvey = clsHelper.fnConvert2Long(dr["IDSurvey"]);
                obj.Response = (Boolean)dr["Response"];
                obj.Retag = (Boolean)dr["Retag"];
                obj.Appraisee = clsHelper.fnConvert2Long(dr["Appraisee"]);
                obj.TotalMarksResult = clsHelper.fnConvert2Long(dr["TotalMarksResult"]);
                mlist.Add(obj);
            }
            return mlist;
        }

        public static List<clsSurveyEmpShareLink> Survey_List_Emp_Response_Active(String Con)
        {
            List<clsSurveyEmpShareLink> mlist = Employee_Survey_List(Con);
            return mlist.Where(x => x.Response == true).ToList();
        }
    }
}
