namespace Survey.Models
{
    public class clsSurveyCreationInfo
    {
        public long IDSurvey { get; set; } = 0;
        public string? Code { get; set; } = "";
        public long Autono { get; set; } = 0;
        public string? Name { get; set; } = "";
        public string? StartDate { get; set; } = "";
        public string? EndDate { get; set; } = "";
        public string? Remarks { get; set; } = "";
        public string? SurveyGUID { get; set; } = "";
        public long? Timer { get; set; } = 0;
        public long? TotalMarks { get; set; } = 0;
        public long? IDCategory { get; set; } = 0;
        public string EntryUser { get; set; } = "";
        public string UpdateUser { get; set; } = "";
        public Boolean? Active { get; set; } = false;
        public Boolean? Publish { get; set; } = false;
    }
    public class clsSurveyInfo
    {
        public List<clsSurveyCreationInfo> Survey { get; set; } = new List<clsSurveyCreationInfo>();
    }
    public class clsSurveyType
    {
        public long IDCategory { get; set; } = 0;
        public string? Code { get; set; } = "";
        public string? Name { get; set; } = "";
        public string? Description { get; set; } = "";
        public Boolean? Active { get; set; } = false;
    }
    public class clsSurveyQuestionInfo
    {
        public List<clsSurveyDetailInfo> Questions { get; set; } = new List<clsSurveyDetailInfo>();
    }
    public class clsSurveyDetailInfo
    {
        public long IDSurvey { get; set; } = 0;
        public string? FormTitle { get; set; } = "";
        public string? FormDesc { get; set; } = "";
        public Decimal Marks { get; set; } = 0;
        public Decimal Time { get; set; } = 0;
        public long QuestionNo { get; set; } = 0;
        public string QuestionType { get; set; } = String.Empty;
        public string QuestionText { get; set; } = String.Empty;
        public string QuestionDesc { get; set; } = String.Empty;
        public string AnswerType { get; set; } = String.Empty;
        public Boolean AnswerText { get; set; } = false;
        public long AnswerTextMarks { get; set; } = 0;
        public Boolean AnswerTextArea { get; set; } = false;
        public long AnswerTextAreaMarks { get; set; } = 0;
        public Boolean AnswerCheckbox1 { get; set; } = false;
        public Boolean AnswerCheckbox2 { get; set; } = false;
        public Boolean AnswerCheckbox3 { get; set; } = false;
        public Boolean AnswerCheckbox4 { get; set; } = false;
        public string AnswerCheckboxText1 { get; set; } = String.Empty;
        public string AnswerCheckboxText2 { get; set; } = String.Empty;
        public string AnswerCheckboxText3 { get; set; } = String.Empty;
        public string AnswerCheckboxText4 { get; set; } = String.Empty;
        public long AnswerCheckbox1Marks { get; set; } = 0;
        public long AnswerCheckbox2Marks { get; set; } = 0;
        public long AnswerCheckbox3Marks { get; set; } = 0;
        public long AnswerCheckbox4Marks { get; set; } = 0;

        public Boolean AnswerRadio1 { get; set; } = false;
        public Boolean AnswerRadio2 { get; set; } = false;
        public Boolean AnswerRadio3 { get; set; } = false;
        public Boolean AnswerRadio4 { get; set; } = false;
        public string AnswerRadioText1 { get; set; } = String.Empty;
        public string AnswerRadioText2 { get; set; } = String.Empty;
        public string AnswerRadioText3 { get; set; } = String.Empty;
        public string AnswerRadioText4 { get; set; } = String.Empty;
        public long AnswerRadio1Marks { get; set; } = 0;
        public long AnswerRadio2Marks { get; set; } = 0;
        public long AnswerRadio3Marks { get; set; } = 0;
        public long AnswerRadio4Marks { get; set; } = 0;

        public Boolean LinearScale { get; set; } = false;
        public long LinearScaleLow { get; set; } = 0;
        public string LinearScaleLowLabel { get; set; } = String.Empty;
        public long LinearScaleHigh { get; set; } = 0;
        public string LinearScaleHighLabel { get; set; } = String.Empty;
        public long LinearScaleMarks { get; set; } = 0;

        public string EntryUser { get; set; } = String.Empty;
        public string UpdateUser { get; set; } = String.Empty;
        public Boolean Active { get; set; } = false;
    }
}
