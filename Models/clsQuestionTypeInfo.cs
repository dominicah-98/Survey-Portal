namespace Survey.Models
{
    public class clsQuestionTypeInfo
    {
        public long IDType { get; set; } = 0;
        public string Name { get; set; } = String.Empty;

    }
    public class clsAnswerTypeInfo
    {
        public long IDType { get; set; } = 0;
        public string Name { get; set; } = String.Empty;
    }
    public class clsAnswerTypeDetailInfo
    {
        public long IDDetail { get; set; } = 0;
        public long IDType { get; set; } = 0;
        public string DiplayText { get; set; } = String.Empty;
        public Boolean value { get; set; } = false;

    }

}
