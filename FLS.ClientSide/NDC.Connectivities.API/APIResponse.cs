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
        private bool _isSuccessful;
        private int _status;
        private string _statusMessage;
        T _data;
        public bool isSuccess { get { return _isSuccessful; } set { _isSuccessful = value; } }
        public int status { get { return _status; } set { _status = value; } }
        public string message { get { return _statusMessage; } set { _statusMessage = value; } }
        public T data { get { return _data; } set { _data = value; } }
        public APIResponse(bool _isSuccessful, HttpStatusCode _status, T _data)
        {
            this._isSuccessful = _isSuccessful;
            this._status = (int)_status;
            this._statusMessage = StatusCodeMessage.GetMessage(_status);
            this._data = _data;
        }
        public APIResponse(bool _isSuccessful, int _status, string _statusMessage, T _data)
        {
            this._isSuccessful = _isSuccessful;
            this._status = _status;
            this._statusMessage = _statusMessage;
            this._data = _data;
        }
    }
}