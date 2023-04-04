using System.ComponentModel.DataAnnotations;

namespace Survey.Models
{
    public class clsSendMail
    {
        public List<string> mToEmail { get; set; } = new List<string>();
    }
}
