using System.Collections.Generic;
using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FLS.ClientSide.Controllers
{
    [Route("api/reports/")]
    public class ReportController : BaseController
    {
        public ReportController(IConfiguration _config) : base(_config) { }

        [HttpPost("live-stock-history-detail")]
        public async Task<ActionResult> List([FromBody]ReportLivestockHistoryDetailRequest _model)
        {
            ResponseConsult<List<ReportLivestockHistoryDetail>> response = await PostAsJsonAsync<List<ReportLivestockHistoryDetail>>(URI_API.REPORT_LIVESTOCK_HISTORY_DETAIL, _model);
            return Ok(response);
        }
    }
}