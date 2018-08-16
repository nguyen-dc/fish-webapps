using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FLS.ClientSide.Controllers
{
    public class BaseController : Controller
    {
        #region Self
        private string API_LINK;
        //private string _accessToken = null;
        protected BaseController(IConfiguration _config)
        {
            API_LINK = _config.GetSection("Connection:API_Server_Link").Value;
            APIConnector.Connect(API_LINK);
            // AddToken
        }

        protected void AddToken(string accessToken)
        {
            // thêm thông tin Header Authorization
            //APIConnector.AddAuthHeader("Bearer", accessToken);
        }
        protected void ClearToken()
        {
            APIConnector.ClearAuthHeader();
        }
        #endregion

        #region Call API Methods
        //----------- Async -----------//
        protected async Task<APIResponse<T>> GetAsync<T>(string _path)
        {
            return await APIConnector.GetAsync<T>(_path);
        }
        protected async Task<APIResponse<T>> PostAsJsonAsync<T>(string _path, object _requestData)
        {
            return await APIConnector.PostAsJsonAsync<T>(_path, _requestData);
        }
        protected async Task<APIResponse<T>> PutAsJsonAsync<T>(string _path, object _requestData)
        {
            return await APIConnector.PutAsJsonAsync<T>(_path, _requestData);
        }
        protected async Task<APIResponse<T>> DeleteAsync<T>(string _path)
        {
            return await APIConnector.DeleteAsync<T>(_path);
        }
        #endregion

        #region Encode Decode 
        protected string EncodeString(string _string)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(_string + "~ndc");
            return Convert.ToBase64String(bytes);
        }
        protected string DecodeString(string _encodedString)
        {
            byte[] bytes = Convert.FromBase64String(_encodedString);
            string password = Encoding.UTF8.GetString(bytes);
            return password.Remove(password.Length - "~ndc".Length);
        }
        protected string ConvertStringToHex(String input, Encoding encoding)
        {
            byte[] stringBytes = encoding.GetBytes(input + "~ndc");
            StringBuilder sbBytes = new StringBuilder(stringBytes.Length * 2);
            foreach (byte b in stringBytes)
            {
                sbBytes.AppendFormat("{0:X2}", b);
            }
            return sbBytes.ToString();
        }
        public static string ConvertHexToString(String hexInput, Encoding encoding)
        {
            int numberChars = hexInput.Length;
            byte[] bytes = new byte[numberChars / 2];
            for (int i = 0; i < numberChars; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hexInput.Substring(i, 2), 16);
            }
            string strFromByte = encoding.GetString(bytes);
            return strFromByte.Remove(strFromByte.Length - "~ndc".Length);
        }
        #endregion
    }
}