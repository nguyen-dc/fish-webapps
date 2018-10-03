using FLS.ServerSide.SharingObject;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace NDC.Connectivities.API
{
    static public class APIConnector
    {
        static private HttpClient _client = new HttpClient();
        #region Constructor
        static public void Connect(string _baseApiUrl)
        {
            _client = new HttpClient();
            if (string.IsNullOrWhiteSpace(_baseApiUrl))
                return;
            _client.BaseAddress = new Uri(_baseApiUrl);
            _client.DefaultRequestHeaders.Accept.Clear();
        }
        private static void AddHeaders()
        {
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Remove("fls-acss-usrnme");
            _client.DefaultRequestHeaders.Add("fls-acss-usrnme", "admin");
        }
        private static async Task<HttpResponseMessage> PostAsJsonAsync<T>(
            this HttpClient httpClient, string url, T data)
        {
            var dataAsString = JsonConvert.SerializeObject(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return await httpClient.PostAsync(url, content);
        }
        private static async Task<HttpResponseMessage> PutAsJsonAsync<T>(
            this HttpClient httpClient, string url, T data)
        {
            var dataAsString = JsonConvert.SerializeObject(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return await httpClient.PutAsync(url, content);
        }
        private static async Task<T> ReadAsJsonAsync<T>(this HttpContent content)
        {
            var dataAsString = await content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(dataAsString);
        }
        private static ResponseConsult<T> NewErrorResponse<T>(string errorCode, string message)
        {
            List<KeyValuePair<string, string>> err = new List<KeyValuePair<string, string>>();
            err.Add(new KeyValuePair<string, string>(errorCode, message));
            ResponseConsult<T> consult = new ResponseConsult<T>(err);
            return consult;
        }
        #endregion
        #region GET
        static public async Task<ResponseConsult<T>> GetAsync<T>(string _path)
        {
            try
            {
                AddHeaders();
                HttpResponseMessage response = await _client.GetAsync(_path);
                if (response.IsSuccessStatusCode)
                {
                    ResponseConsult<T> svrRes = null;
                    svrRes = await response.Content.ReadAsJsonAsync<ResponseConsult<T>>();
                    return svrRes;
                }
                else
                {
                    return NewErrorResponse<T>("cll-api-flre-" + response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (Exception ex)
            {
                return NewErrorResponse<T>("sstm-xcptn", ex.ToString());
            }
        }
        #endregion
        #region POST
        static public async Task<ResponseConsult<T>> PostAsJsonAsync<T>(string _path, object _requestData)
        {
            try
            {
                AddHeaders();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await _client.PostAsJsonAsync(_path, _requestData);
                if (response.IsSuccessStatusCode)
                {
                    ResponseConsult<T> svrRes = null;
                    svrRes = await response.Content.ReadAsJsonAsync<ResponseConsult<T>>();
                    return svrRes;
                }
                else
                {
                    return NewErrorResponse<T>("cll-api-flre-" + response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (Exception ex)
            {
                return NewErrorResponse<T>("sstm-xcptn", ex.ToString());
            }
        }
        #endregion
        #region PUT
        static public async Task<ResponseConsult<T>> PutAsJsonAsync<T>(string _path, object _requestData)
        {
            try
            {
                AddHeaders();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await _client.PutAsJsonAsync(_path, _requestData);
                if (response.IsSuccessStatusCode)
                {
                    ResponseConsult<T> svrRes = null;
                    svrRes = await response.Content.ReadAsJsonAsync<ResponseConsult<T>>();
                    return svrRes;
                }
                else
                {
                    return NewErrorResponse<T>("cll-api-flre-" + response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (Exception ex)
            {
                return NewErrorResponse<T>("sstm-xcptn", ex.ToString());
            }
        }
        #endregion
        #region DELETE
        static public async Task<ResponseConsult<T>> DeleteAsync<T>(string _path)
        {
            try
            {
                AddHeaders();
                HttpResponseMessage response = await _client.DeleteAsync(_path);
                if (response.IsSuccessStatusCode)
                {
                    ResponseConsult<T> svrRes = null;
                    svrRes = await response.Content.ReadAsJsonAsync<ResponseConsult<T>>();
                    return svrRes;
                }
                else
                {
                    return NewErrorResponse<T>("cll-api-flre-" + response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (Exception ex)
            {
                return NewErrorResponse<T>("sstm-xcptn", ex.ToString());
            }
        }
        #endregion
        #region Secondary Methods
        static public void AddHeader(string _key, string _value, bool _clearOld = false)
        {
            if (_client != null)
            {
                if (_clearOld) _client.DefaultRequestHeaders.Remove(_key);
                _client.DefaultRequestHeaders.Add(_key, _value);
            }
        }
        static public void AddAuthHeader(string _scheme, string _value)
        {
            if (_client != null)
            {
                _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(_scheme, _value);
            }
        }
        static public void ClearAuthHeader()
        {
            if (_client != null)
            {
                _client.DefaultRequestHeaders.Authorization = null;
            }
        }
        static public void ClearHeaders()
        {
            if (_client != null)
            {
                _client.DefaultRequestHeaders.Clear();
                _client.DefaultRequestHeaders.Accept.Clear();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }
        }
        #endregion
        #region Private Methods
        static private string ConcatDir(string dirN, string dirDC)
        {
            string dirNDC = dirN.TrimEnd('\\').TrimEnd('/') + "/" + dirDC.TrimStart('\\').TrimStart('/');
            dirNDC = dirNDC.Replace('\\', '/');
            return dirNDC;
        }
        #endregion

        private class Error_Content
        {
            public string error { get; set; }
            public string error_description { get; set; }
        }
    }
    public class StreamWithHeader
    {
        public Stream stream { get; set; }
        public HttpContentHeaders headers { get; set; }
    }
}
