using Newtonsoft.Json;
using System;
using System.IO;
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
        public static async Task<HttpResponseMessage> PostAsJsonAsync<T>(
            this HttpClient httpClient, string url, T data)
        {
            var dataAsString = JsonConvert.SerializeObject(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return await httpClient.PostAsync(url, content);
        }
        public static async Task<HttpResponseMessage> PutAsJsonAsync<T>(
            this HttpClient httpClient, string url, T data)
        {
            var dataAsString = JsonConvert.SerializeObject(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return await httpClient.PutAsync(url, content);
        }
        public static async Task<T> ReadAsJsonAsync<T>(this HttpContent content)
        {
            var dataAsString = await content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(dataAsString);
        }
        #endregion
        #region GET
        static public async Task<APIResponse<T>> GetAsync<T>(string _path)
        {
            try
            {
                _client.DefaultRequestHeaders.Accept.Clear();
                T data = default(T);
                HttpResponseMessage response = await _client.GetAsync(_path);
                if (response.IsSuccessStatusCode)
                {
                    FromServerResponse<T> svrRes = null;
                    svrRes = await response.Content.ReadAsJsonAsync<FromServerResponse<T>>();
                    if (svrRes != null)
                    {
                        if (svrRes.hasError)
                        {
                            return new APIResponse<T>(false, svrRes.errorCode,svrRes.errorMessage , data);
                        }
                        else data = svrRes.data;
                    }
                }
                return new APIResponse<T>(response.IsSuccessStatusCode, response.StatusCode, data);
            }
            catch (Exception ex)
            {
                return new APIResponse<T>(false, -1, ex.Message, default(T));
            }
        }
        #endregion
        #region POST
        static public async Task<APIResponse<T>> PostAsJsonAsync<T>(string _path, object _requestData)
        {
            try
            {
                _client.DefaultRequestHeaders.Accept.Clear();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await _client.PostAsJsonAsync(_path, _requestData);
                T data = default(T);
                if (response.IsSuccessStatusCode)
                {
                    FromServerResponse<T> svrRes = null;
                    svrRes = await response.Content.ReadAsJsonAsync<FromServerResponse<T>>();
                    if (svrRes != null)
                    {
                        if (svrRes.hasError)
                        {
                            return new APIResponse<T>(false, svrRes.errorCode, svrRes.errorMessage, data);
                        }
                        else data = svrRes.data;
                    }
                }
                return new APIResponse<T>(response.IsSuccessStatusCode, response.StatusCode, data);
            }
            catch (Exception ex)
            {
                return new APIResponse<T>(false, -1, ex.Message, default(T));
            }
        }
        #endregion
        #region PUT
        static public async Task<APIResponse<T>> PutAsJsonAsync<T>(string _path, object _requestData)
        {
            try
            {
                _client.DefaultRequestHeaders.Accept.Clear();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await _client.PutAsJsonAsync(_path, _requestData);
                T data = default(T);
                if (response.IsSuccessStatusCode)
                {
                    FromServerResponse<T> svrRes = null;
                    svrRes = await response.Content.ReadAsJsonAsync<FromServerResponse<T>>();
                    if (svrRes != null)
                    {
                        if (svrRes.hasError)
                        {
                            return new APIResponse<T>(false, svrRes.errorCode, svrRes.errorMessage, data);
                        }
                        else _requestData = svrRes.data;
                    }
                }
                return new APIResponse<T>(response.IsSuccessStatusCode, response.StatusCode, data);
            }
            catch (Exception ex)
            {
                return new APIResponse<T>(false, -1, ex.Message, default(T));
            }
        }
        #endregion
        #region DELETE
        static public async Task<APIResponse<T>> DeleteAsync<T>(string _path)
        {
            try
            {
                _client.DefaultRequestHeaders.Accept.Clear();
                HttpResponseMessage response = await _client.DeleteAsync(_path);
                T data = default(T);
                if (response.IsSuccessStatusCode)
                {
                    FromServerResponse<T> svrRes = null;
                    svrRes = await response.Content.ReadAsJsonAsync<FromServerResponse<T>>();
                    if (svrRes != null)
                    {
                        if (svrRes.hasError)
                        {
                            return new APIResponse<T>(false, svrRes.errorCode, svrRes.errorMessage, data);
                        }
                        else data = svrRes.data;
                    }
                }
                return new APIResponse<T>(response.IsSuccessStatusCode, response.StatusCode, data);
            }
            catch (Exception ex)
            {
                return new APIResponse<T>(false, -1, ex.Message, default(T));
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
    public class FromServerResponse<T>
    {
        public bool hasError { get; set; }
        public int errorCode { get; set; }
        public string errorMessage { get; set; }
        public T data { get; set; }
        public FromServerResponse(T _data)
        {
            data = _data;
        }
    }
    public class StreamWithHeader
    {
        public Stream stream { get; set; }
        public HttpContentHeaders headers { get; set; }
    }
}
