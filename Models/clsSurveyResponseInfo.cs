namespace Survey.Models
{
    public class clsSurveyResponseInfo
    {
        public long IDSurvey { get; set; } = 0;
        public string? UserName { get; set; } = "";
        public string UserEmail { get; set; } = String.Empty;
        public long UserID { get; set; } = 0;
        public Boolean Retag { get; set; } = false;
        public long QuestionNo { get; set; } = 0;
        public string AnswerText { get; set; } = String.Empty;
        public long AnswerTextMarksResult { get; set; } = 0;
        public string AnswerTextArea { get; set; } = String.Empty;
        public long AnswerTextAreaMarksResult { get; set; } = 0;
        public Boolean AnswerCheckbox1 { get; set; } = false;
        public Boolean AnswerCheckbox2 { get; set; } = false;
        public Boolean AnswerCheckbox3 { get; set; } = false;
        public Boolean AnswerCheckbox4 { get; set; } = false;
        public string AnswerCheckboxText1 { get; set; } = String.Empty;
        public string AnswerCheckboxText2 { get; set; } = String.Empty;
        public string AnswerCheckboxText3 { get; set; } = String.Empty;
        public string AnswerCheckboxText4 { get; set; } = String.Empty;
        public long AnswerCheckbox1MarksResult { get; set; } = 0;
        public long AnswerCheckbox2MarksResult { get; set; } = 0;
        public long AnswerCheckbox3MarksResult { get; set; } = 0;
        public long AnswerCheckbox4MarksResult { get; set; } = 0;
        public string CheckBoxRemarks { get; set; } = String.Empty;

        public Boolean AnswerRadio { get; set; } = false;
        public string AnswerRadioText { get; set; } = String.Empty;
        public long AnswerRadioMarksResult { get; set; } = 0;
        public string RadioRemarks { get; set; } = String.Empty;

        public Boolean LinearScale { get; set; } = false;
        public long LinearScaleResp { get; set; } = 0;
        public String LinearScaleRemarks { get; set; } = String.Empty;
        public long LinearScaleMarksResult { get; set; } = 0;
    }
    public class clsSurveySaveResponse
    {
        public List<clsSurveyResponseInfo> UserResponse { get; set; } = new List<clsSurveyResponseInfo>();
    }
    public class clsSurveyShareLink
    {
        public string? UserEmail { get; set; } = "";
        public string? UserName { get; set; } = "";
        public long IDSurvey { get; set; } = 0;
        public Boolean? Response { get; set; } = false;
        public long? TotalMarksResult { get; set; } = 0;
    }
    public class clsSurveyEmpShareLink
    {
        public long? EmpID { get; set; } = 0;
        //public string? EmpName { get; set; } = "";
        public long? DeptID { get; set; } = 0;
        public long IDSurvey { get; set; } = 0;
        public Boolean? Response { get; set; } = false;
        public Boolean? Retag { get; set; } = false;
        public long? Appraisee { get; set; } = 0;
        public long? TotalMarksResult { get; set; } = 0;
    }
    public class clsSurveyEmpShareInfo
    {
        public List<clsSurveyEmpShareLink> EmpShare { get; set; } = new List<clsSurveyEmpShareLink>();
    }
    public class clsDeptInfo
    {
        public int DepartmentId { get; set; }
        public string Department { get; set; }
    }
    public class clsEmpInfo
    {
        public int empno { get; set; }
        public int empdept { get; set; }
        public string empfirstname { get; set; }
        public string empmiddlename { get; set; }
        public string emplastname { get; set; }
        public string? empemail { get; set; }
    }
}
