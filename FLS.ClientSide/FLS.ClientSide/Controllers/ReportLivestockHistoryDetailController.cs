using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FLS.ClientSide.Controllers
{
    [Route("api/report-live-stock-history-detail")]
    public class ReportLivestockHistoryDetailController : BaseController
    {
        public ReportLivestockHistoryDetailController(IConfiguration _config) : base(_config) { }

        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]ReportLivestockHistoryDetailRequest _model)
        {
            ResponseConsult<ReportLivestockHistoryDetail> response = await PostAsJsonAsync<ReportLivestockHistoryDetail>(URI_API.REPORT_LIVESTOCK_HISTORY_DETAIL, _model);
            return Ok(response);
        }
    }
}