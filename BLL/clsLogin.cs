using Survey.Models;
using Survey.BLL;
using Common.Utility;
using System.Data;
using System.Diagnostics.Metrics;

namespace Survey.BLL
{
    public class clsLogin
    {
        public static String  Login_Check(String Con , clsLoginInfo info)
        {
            return clsDatabase.DBOperation(Con, "PRC_Login_Check", info.UserName, info.Password);
        }
       
    }
}
