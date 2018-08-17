using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace NDC.Connectivities.API
{
    static public class StatusCodeMessage
    {
        static private Dictionary<HttpStatusCode, string> dict;
        static public string GetMessage(HttpStatusCode code)
        {
            string message = "";
            dict.TryGetValue(code, out message);
            return message;
        }
        static StatusCodeMessage()
        {
            if (dict != null)
                return;
            dict = new Dictionary<HttpStatusCode, string>();
            dict.Add(HttpStatusCode.Accepted, "Accepted");
            dict.Add(HttpStatusCode.Ambiguous, "Ambiguous");
            dict.Add(HttpStatusCode.BadGateway, "BadGateway");
            dict.Add(HttpStatusCode.BadRequest, "BadRequest");
            dict.Add(HttpStatusCode.Conflict, "Conflict");
            dict.Add(HttpStatusCode.Continue, "Continue");
            dict.Add(HttpStatusCode.Created, "Created");
            dict.Add(HttpStatusCode.ExpectationFailed, "ExpectationFailed");
            dict.Add(HttpStatusCode.Forbidden, "Forbidden");
            dict.Add(HttpStatusCode.Found, "Found");
            dict.Add(HttpStatusCode.GatewayTimeout, "GatewayTimeout");
            dict.Add(HttpStatusCode.Gone, "Gone");
            dict.Add(HttpStatusCode.HttpVersionNotSupported, "HttpVersionNotSupported");
            dict.Add(HttpStatusCode.InternalServerError, "InternalServerError");
            dict.Add(HttpStatusCode.LengthRequired, "LengthRequired");
            dict.Add(HttpStatusCode.MethodNotAllowed, "MethodNotAllowed");
            dict.Add(HttpStatusCode.Moved, "Moved");
            //dict.Add(HttpStatusCode.MovedPermanently, "MovedPermanently"); //Moved
            //dict.Add(HttpStatusCode.MultipleChoices, "MultipleChoices"); //Ambiguous
            dict.Add(HttpStatusCode.NoContent, "NoContent");
            dict.Add(HttpStatusCode.NonAuthoritativeInformation, "NonAuthoritativeInformation");
            dict.Add(HttpStatusCode.NotAcceptable, "NotAcceptable");
            dict.Add(HttpStatusCode.NotFound, "NotFound");
            dict.Add(HttpStatusCode.NotImplemented, "NotImplemented");
            dict.Add(HttpStatusCode.NotModified, "NotModified");
            dict.Add(HttpStatusCode.OK, "OK");
            dict.Add(HttpStatusCode.PartialContent, "PartialContent");
            dict.Add(HttpStatusCode.PaymentRequired, "PaymentRequired");
            dict.Add(HttpStatusCode.PreconditionFailed, "PreconditionFailed");
            dict.Add(HttpStatusCode.ProxyAuthenticationRequired, "ProxyAuthenticationRequired");
            //dict.Add(HttpStatusCode.Redirect, "Redirect"); //Found
            dict.Add(HttpStatusCode.RedirectKeepVerb, "RedirectKeepVerb");
            dict.Add(HttpStatusCode.RedirectMethod, "RedirectMethod");
            dict.Add(HttpStatusCode.RequestedRangeNotSatisfiable, "RequestedRangeNotSatisfiable");
            dict.Add(HttpStatusCode.RequestEntityTooLarge, "RequestEntityTooLarge");
            dict.Add(HttpStatusCode.RequestTimeout, "RequestTimeout");
            dict.Add(HttpStatusCode.RequestUriTooLong, "RequestUriTooLong");
            dict.Add(HttpStatusCode.ResetContent, "ResetContent");
            //dict.Add(HttpStatusCode.SeeOther, "SeeOther"); //RedirectMethod
            dict.Add(HttpStatusCode.ServiceUnavailable, "ServiceUnavailable");
            dict.Add(HttpStatusCode.SwitchingProtocols, "SwitchingProtocols");
            //dict.Add(HttpStatusCode.TemporaryRedirect, "TemporaryRedirect"); //RedirectKeepVerb
            dict.Add(HttpStatusCode.Unauthorized, "Unauthorized");
            dict.Add(HttpStatusCode.UnsupportedMediaType, "UnsupportedMediaType");
            dict.Add(HttpStatusCode.Unused, "Unused");
            dict.Add(HttpStatusCode.UpgradeRequired, "UpgradeRequired");
            dict.Add(HttpStatusCode.UseProxy, "UseProxy");
        }
    }
}
