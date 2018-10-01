using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace NDC.Connectivities.API
{
    public class APIResponse<T>
    {
        public bool isSuccess { get; set; }
        public int status { get; set; }
        public string message { get; set; }
        public T data { get; set; }
        public APIResponse(bool _isSuccessful, HttpStatusCode _status, T _data)
        {
            isSuccess = _isSuccessful;
            status = (int)_status;
            message = StatusCodeMessage.GetMessage(_status);
            data = _data;
        }
        public APIResponse(bool _isSuccessful, int _status, string _statusMessage, T _data)
        {
            isSuccess = _isSuccessful;
            status = _status;
            message = _statusMessage;
            data = _data;
        }
    }
}