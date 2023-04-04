using System.Text;
using System.Text.RegularExpressions;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;
using System.Security.Cryptography;
using System.Net.Mail;
using System.Net;
using System.Reflection;
using System.Xml.Linq;
using System.Net.Http.Headers;

namespace Common.Utility
{
    public class clsAPI
    {
        private String APIBaseURL { get; set; } = "";
        public clsAPI(String _APIBaseURL)
        {
            APIBaseURL = _APIBaseURL;
        }
        public HttpResponseMessage APIPost(string APIMethod, string contents)
        {
            HttpResponseMessage response;
            using (var client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(APIBaseURL);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                response = client.PostAsync(APIMethod, new StringContent(contents, Encoding.UTF8, "application/json")).Result;
            }
            return response;
        }

        public HttpResponseMessage APIPost(string APIMethod)
        {
            HttpResponseMessage response;
            using (var client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(APIBaseURL);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                response = client.PostAsync(APIMethod, new StringContent("", Encoding.UTF8, "application/json")).Result;
            }
            return response;
        }
    }
    public class clsHelper
    {
        public static string ConvertAmountToINR(double dblAmount, bool boolUseShortFormat = false) //string strAmount
        {
            string strFormattedAmount = "";
            if (boolUseShortFormat == false)
            {
                strFormattedAmount = dblAmount.ToString("#,0.00", System.Globalization.CultureInfo.CreateSpecificCulture("hi-IN"));
            }
            else
            {
                string strAmt = "", strAmtPart1 = "", strAmtPart2 = "";
                double dblAmtPart1 = 0, dblAmtPart2 = 0;

                // Displays 123,45,67,890   
                if (dblAmount < 1000)
                    strFormattedAmount = dblAmount.ToString("#,0.00", System.Globalization.CultureInfo.CreateSpecificCulture("hi-IN"));

                // Displays 123,45,68K
                else if (dblAmount >= 1000 && dblAmount < 100000)
                    strFormattedAmount = dblAmount.ToString("#,#,K", System.Globalization.CultureInfo.CreateSpecificCulture("hi-IN"));//InvariantCulture

                // Displays 123,5L
                else if (dblAmount >= 100000 && dblAmount < 10000000)
                {
                    strAmt = dblAmount.ToString();
                    strAmtPart1 = strAmt.Substring(0, (strAmt.Length - 5));
                    strAmtPart2 = strAmt.Substring((strAmt.Length - 5), 5);

                    dblAmtPart1 = Convert.ToDouble(strAmtPart1);
                    dblAmtPart2 = Convert.ToDouble(strAmtPart2);

                    if (dblAmtPart2 > 55999)
                    {
                        dblAmtPart1 = dblAmtPart1 + 1;
                    }

                    strAmtPart1 = dblAmtPart1.ToString("#,#", System.Globalization.CultureInfo.CreateSpecificCulture("hi-IN"));

                    strFormattedAmount = strAmtPart1 + "L";
                }
                // Displays 123C
                else if (dblAmount >= 10000000)
                {
                    strAmt = dblAmount.ToString();
                    strAmtPart1 = strAmt.Substring(0, (strAmt.Length - 7));
                    strAmtPart2 = strAmt.Substring((strAmt.Length - 7), 7);

                    dblAmtPart1 = Convert.ToDouble(strAmtPart1);
                    dblAmtPart2 = Convert.ToDouble(strAmtPart2);

                    if (dblAmtPart2 > 5599999)
                    {
                        dblAmtPart1 = dblAmtPart1 + 1;
                    }

                    strAmtPart1 = dblAmtPart1.ToString("#,#", System.Globalization.CultureInfo.CreateSpecificCulture("hi-IN"));

                    strFormattedAmount = strAmtPart1 + "C";
                }
            }

            return strFormattedAmount;
        }
        public static long fnConvert2Long(object pText)
        {
            try
            {
                if (pText == null || pText == String.Empty || pText == "{}")
                {
                    return 0;
                }
                else
                {
                    return Convert.ToInt32(pText);
                }
            }
            catch
            {
                return 0;
            }
        }
        public static int fnConvert2Int(object pText)
        {
            try
            {
                if (pText == null || pText == string.Empty || pText == "{}")
                {
                    return 0;
                }
                else
                {
                    return Convert.ToInt16(pText);
                }
            }
            catch
            {
                return 0;
            }
        }
        public static decimal fnConvert3Decimal(object pText)
        {
            try
            {
                if (pText == null || pText == "" || pText == "{}")
                {
                    return 0;
                }
                else
                {
                    //return Convert.ToDecimal(pText).ToString("0.00");
                    return Convert.ToDecimal(Convert.ToDecimal(pText).ToString("0.000"));
                }
            }
            catch
            {
                return 0;
            }
        }
        public static decimal fnConvert2Decimal(object pText)
        {
            try
            {
                if (pText == null || pText == "" || pText == "{}")
                {
                    return 0;
                }
                else
                {
                    //return Convert.ToDecimal(pText).ToString("0.00");
                    return Convert.ToDecimal(Convert.ToDecimal(pText).ToString("0.00"));
                }
            }
            catch
            {
                return 0;
            }
        }
        public static double fnConvert2Double(object pText)
        {
            try
            {
                if (pText == null || pText.ToString() == "" || pText.ToString() == "{}")
                {
                    return 0;
                }
                else
                {
                    //return Convert.ToDecimal(pText).ToString("0.00");
                    return Convert.ToDouble(pText);
                }
            }
            catch
            {
                return 0;
            }
        }
        public static string fnConvert2String(String pText)
        {
            try
            {
                if (String.IsNullOrEmpty(pText))
                {
                    return "";
                }
                else
                {
                    return Convert.ToString(pText);
                }
            }
            catch
            {
                return "";
            }
        }
        public static String fnConvert2PascalWithSpace(String pText)
        {
            String mText = pText;
            if (mText != "")
            {
                mText = System.Threading.Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(mText.ToLower());
            }
            return mText;
        }
        public static String fnConvert2StartCapital(String pText)
        {
            String mText = pText;
            if (mText != "")
            {
                return char.ToUpper(mText[0]) + pText.Substring(1).ToLower();
            }
            return mText;
        }
        public static bool fnIsNumeric(string pText)
        {
            Regex regex = new Regex("[^0-9.-]+");
            return !regex.IsMatch(pText);
        }
        public static string fnAutoNumber()
        {
            String mAutoNo = System.DateTime.Now.ToString("ddmmyy");
            return mAutoNo;
        }
        public static String fnAutoNumber(int pdigit)
        {
            Random generator = new Random();
            String mAutoNo = Convert.ToString(generator.Next(0, 1000000).ToString("D6"));
            return mAutoNo;
        }
        public static String fnAutoNumber8()
        {
            Random generator = new Random();
            String mAutoNo = Convert.ToString(generator.Next(0, 100000000).ToString("D8"));
            return mAutoNo;
        }
        public static string encrypt(string encryptString)
        {
            string EncryptionKey = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%";
            byte[] clearBytes = Encoding.Unicode.GetBytes(encryptString);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 , 0x20, 0x4d, 0x49, 0x76
             });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    encryptString = Convert.ToBase64String(ms.ToArray());
                }
            }
            return encryptString;
        }
        public static string SplitQueryString(string QueryString)
        {

            string strReq = "";
            try
            {

                strReq = QueryString;
                strReq = strReq.Substring(strReq.IndexOf('?') + 1);

                return strReq;
            }
            catch (Exception ex)
            {
                strReq = ex.Message.ToString();
                return strReq;
            }
            finally { }
        }
        public static string SplitQueryString(string QueryString, char SplitType)
        {

            string strReq = "";
            try
            {

                strReq = QueryString;
                strReq = strReq.Substring(strReq.IndexOf(SplitType) + 1);

                return strReq;
            }
            catch (Exception ex)
            {
                strReq = ex.Message.ToString();
                return strReq;
            }
            finally { }
        }
        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%";
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
                 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76, 0x20, 0x4d, 0x49, 0x76
            });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
        public static Boolean fnConvert2Boolean(String pText)
        {
            try
            {
                if (String.IsNullOrEmpty(pText))
                {
                    return false;
                }
                else
                {
                    return Convert.ToBoolean(pText);
                }
            }
            catch
            {
                return false;
            }
        }
        public Boolean fnValidEmail(String pEmail)
        {
            String mPattern = "^[a-zA-Z0-9][-\\._a-zA-Z0-9]*@[a-zA-Z0-9][-\\.a-zA-Z0-9]*\\.(com|edu|info|gov|int|mil|net|org|biz|name|museum|coop|aero|pro|tv|[a-zA-Z]{2})$";
            System.Text.RegularExpressions.Regex mCheck = new System.Text.RegularExpressions.Regex(mPattern, RegexOptions.IgnorePatternWhitespace);
            Boolean mValid = false;
            if (String.IsNullOrEmpty(pEmail) == true)
            {
                mValid = true;
            }
            else
            {
                mValid = mCheck.IsMatch(pEmail);
            }
            return mValid;
        }
        public static decimal[] fnRoundoff(decimal netamt)
        {
            decimal[] myarray = new decimal[2];
            decimal roundoff = 0;
            decimal double_result = (decimal)((netamt - (decimal)((long)netamt)));
            if (double_result != 0)
            {
                if (double_result >= (decimal)(0.5))
                {
                    roundoff = (1 - double_result);
                }
                else
                {
                    roundoff = -(double_result);
                }
            }
            else
            {
                roundoff = 0;
            }
            myarray[0] = roundoff;
            myarray[1] = (netamt + roundoff);
            return myarray;
        }
        public static decimal fnCeilingFloor(Decimal decvalue)
        {
            decimal trnvalue = 0;
            int mint = (int)(decvalue);
            float floatpart = ((float)decvalue - mint);
            if (floatpart >= 0.5)
            {
                trnvalue = Math.Ceiling(decvalue);
            }
            else
            {
                trnvalue = Math.Floor(decvalue);
            }

            return trnvalue;
        }
        public static String fnAutoNumber4()
        {
            Random generator = new Random();
            String mAutoNo = Convert.ToString(generator.Next(0, 1000000).ToString("D6"));
            return mAutoNo;
        }
        public static string fnSendEmail(string SMTPServer, Boolean EnableSSL_TrueFalse, string Username, string Password, int SMTP_Port, string mfromEmail, string mToEmail, string mSubject, string mBody)
        {
            string EmailStatus = "";
            try
            {
                using (MailMessage mm = new MailMessage())
                {
                    mm.From = new MailAddress(mfromEmail);
                    mm.To.Add(mToEmail);
                    mm.Subject = mSubject;
                    mm.Body = mBody;

                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = SMTPServer;
                    smtp.EnableSsl = EnableSSL_TrueFalse;
                    NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = SMTP_Port;
                    smtp.Send(mm);
                    EmailStatus = "";
                    return EmailStatus;
                }
            }
            catch (Exception ex)
            {
                EmailStatus = ex.Message.ToString();
                return EmailStatus;
            }
            finally { }
        }
        //public static string EmailHelper(String calledFrom, String smtpServer, int smtpPort, bool SSL, String password, String fromEmail, String toEmail, String emailSubject, String emailBody, String attachmentPath, String attachmentName)
        //{
        //    string error = "";
        //    try
        //    {
        //        NetworkCredential login = new NetworkCredential(fromEmail, password);
        //        SmtpClient smtp = new SmtpClient(smtpServer);
        //        smtp.Port = smtpPort;
        //        smtp.EnableSsl = SSL;
        //        smtp.Credentials = login;

        //        MailMessage msg = new MailMessage { From = new MailAddress(fromEmail) };
        //        msg.To.Add(new MailAddress(toEmail));
        //        msg.Subject = emailSubject;
        //        msg.Body = emailBody;

        //        System.Net.Mail.Attachment attachment;
        //        String Path = HttpContext.Current.Server.MapPath(attachmentPath);
        //        attachment = new System.Net.Mail.Attachment(Path);
        //        msg.Attachments.Add(attachment);

        //        msg.IsBodyHtml = false;
        //        msg.Priority = MailPriority.Normal;
        //        msg.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
        //        System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
        //        smtp.Send(msg);
        //        error = "";
        //    }
        //    catch (Exception ex)
        //    {
        //        error = "Issue";
        //        clsDatabase.fnErrorLog(calledFrom, ex.Message.ToString());
        //    }
        //    return error;
        //}
        public static DataTable fnToDataTable<T>(List<T> items, string[] redundantColumns = null)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Defining type of data column gives proper data table 
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            if (redundantColumns != null)
            {
                foreach (string rc in redundantColumns)
                {
                    dataTable.Columns.Remove(rc);
                }
            }
            return dataTable;
        }
        public static List<T> ConvertToList<T>(DataTable dt)
        {
            var columnNames = dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName.ToLower()).ToList();
            var properties = typeof(T).GetProperties();
            return dt.AsEnumerable().Select(row =>
            {
                var objT = Activator.CreateInstance<T>();
                foreach (var pro in properties)
                {
                    if (columnNames.Contains(pro.Name.ToLower()))
                    {
                        try
                        {
                            pro.SetValue(objT, row[pro.Name]);
                        }
                        catch (Exception ex) { }
                    }
                }
                return objT;
            }).ToList();
        }

        #region Private Methods
        private static T GetItemFromDataTable<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
        #endregion
    }
    public class clsDatabase
    {
        public static String DBOperation(String Connection, String SPName, params object[] ParaValue)
        {
            SqlConnection Con = new SqlConnection(Connection);
            String Result = "";
            String Logtext = "";
            try
            {
                Con.Open();
                SqlCommand Cmd = new SqlCommand(SPName, Con);
                Cmd.CommandType = CommandType.StoredProcedure;
                SqlCommandBuilder.DeriveParameters(Cmd);
                Cmd.Parameters.RemoveAt(0);
                SqlParameter[] pParaName = new SqlParameter[Cmd.Parameters.Count];
                Cmd.Parameters.CopyTo(pParaName, 0);
                Cmd.Parameters.Clear();
                Result = AddParaValue(Cmd, pParaName, ParaValue);
                if (Result == "") // Parameter value properly passed
                {
                    Result = (String)Cmd.ExecuteScalar();
                }
                return Result;
            }
            catch (Exception e)
            {
                // Error Log
                Result = "Error Log: " + e.Message;
                ExecutionLog(e.Message);
                return Result;
            }
            finally
            {
                // Execution Log Register
                Logtext = "Execution Log: " + Con.ConnectionString + "," + SPName;
                ExecutionLog(Logtext);
                Con.Close();
            }
        }
        private static String AddParaValue(SqlCommand Com, SqlParameter[] ParaName, object[] ParaValue)
        {
            String Result = "";
            if (Com == null)
            {
                Result = "Command initialization issue...";
            }
            else if (ParaName == null)
            {
                Result = "Parameter Name List Initialization Issue...";
            }
            else if (ParaValue == null)
            {
                Result = "Parameter Value List Initialization Issue...";
            }
            else if (ParaName.Length > ParaValue.Length)
            {
                Result = "Parameter Length Issue (Name List > Value List)...";
            }
            else if (ParaName.Length < ParaValue.Length)
            {
                Result = "Parameter Length Issue (Name List < Value List)...";
            }
            else
            {
                Result = "";
                for (int index = 0; index <= ParaName.Length - 1; index++)

                    Com.Parameters.AddWithValue(ParaName[index].ParameterName, ParaValue[index]);
            }
            return Result;
        }
        public static DataSet DataSet(String Connection, String SPName, params object[] ParaValue)
        {
            SqlConnection Con = new SqlConnection(Connection);
            String Result = "";
            String Logtext = "";
            DataSet DS = new DataSet("Data");
            try
            {
                Con.Open();
                SqlCommand Com = new SqlCommand(SPName, Con);
                Com.CommandType = CommandType.StoredProcedure;
                SqlCommandBuilder.DeriveParameters(Com);
                Com.Parameters.RemoveAt(0);
                SqlParameter[] pParaName = new SqlParameter[Com.Parameters.Count];
                Com.Parameters.CopyTo(pParaName, 0);
                Com.Parameters.Clear();
                Result = AddParaValue(Com, pParaName, ParaValue);
                if (Result == "") // Parameter value properly passed
                {
                    SqlDataAdapter DAP = new SqlDataAdapter(Com);
                    DAP.Fill(DS);
                }
                return DS;
            }
            catch (Exception e)
            {
                // Error Log
                Result = "Error Log: " + e.Message;
                ExecutionLog(e.Message);
                return DS;
            }
            finally
            {
                // Execution Log Register
                Logtext = "Execution Log: " + Con.ConnectionString + "," + SPName;
                ExecutionLog(Logtext);
                Con.Close();
            }
        }
        public static DataSet DataSet(String Connection, String SPName)
        {
            SqlConnection Con = new SqlConnection(Connection);
            String Result = "";
            String Logtext = "";
            DataSet DS = new DataSet("Data");
            try
            {
                Con.Open();
                SqlCommand Com = new SqlCommand(SPName, Con);
                Com.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter DAP = new SqlDataAdapter(Com);
                DAP.Fill(DS);
                return DS;
            }
            catch (Exception e)
            {
                // Error Log 
                Result = "Error Log: " + e.Message;
                ExecutionLog(e.Message);
                return DS;
            }
            finally
            {
                // Execution Log Register
                Logtext = "Execution Log: " + Con.ConnectionString + "," + SPName;
                ExecutionLog(Logtext);
                Con.Close();
            }
        }
        public static DataTable DataTable(String Connection, String SPName)
        {
            SqlConnection Con = new SqlConnection(Connection);
            String Result = "";
            String Logtext = "";
            DataTable DT = new DataTable("Data");
            try
            {
                Con.Open();
                SqlCommand mCom = new SqlCommand(SPName, Con);
                mCom.CommandType = CommandType.StoredProcedure;
                DT.Load(mCom.ExecuteReader());
                return DT;
            }
            catch (Exception e)
            {
                // Error Log 
                Result = "Error Log: " + e.Message;
                ExecutionLog(e.Message);
                return DT;
            }
            finally
            { // Execution Log Register
                Logtext = "Execution Log: " + Con.ConnectionString + "," + SPName;
                ExecutionLog(Logtext);
                Con.Close();
            }
        }
        public static DataTable DataTable(String Connection, String SPName, params object[] ParaValue)
        {
            SqlConnection Con = new SqlConnection(Connection);
            String Result = "";
            String Logtext = "";
            DataTable DT = new DataTable("Data");
            try
            {
                Con.Open();
                SqlCommand Com = new SqlCommand(SPName, Con);
                Com.CommandType = CommandType.StoredProcedure;
                SqlCommandBuilder.DeriveParameters(Com);
                Com.Parameters.RemoveAt(0);
                SqlParameter[] ParaName = new SqlParameter[Com.Parameters.Count];
                Com.Parameters.CopyTo(ParaName, 0);
                Com.Parameters.Clear();
                Result = AddParaValue(Com, ParaName, ParaValue);
                DT.Load(Com.ExecuteReader());
                return DT;
            }
            catch (Exception e)
            {
                // Error Log 
                Result = "Error Log: " + e.Message;
                ExecutionLog(e.Message);
                return DT;
            }
            finally
            {// Execution Log Register
                Logtext = "Execution Log: " + Con.ConnectionString + "," + SPName;
                ExecutionLog(Logtext);
                Con.Close();
            }
        }
        public static void ExecutionLog(String Logtext)
        {
            String mMessage = Logtext + Environment.NewLine;
        }

    }
}
