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

        [HttpPost("livestock-history-detail")]
        public async Task<ActionResult> LivestockHistoryDetail([FromBody]ReportLivestockHistoryDetailRequest _model)
        {
            ResponseConsult<List<ReportLivestockHistoryDetail>> response = await PostAsJsonAsync<List<ReportLivestockHistoryDetail>>(URI_API.REPORT_LIVESTOCK_HISTORY_DETAIL, _model);
            return Ok(response);
        }
        [HttpPost("feed-conversion-rate")]
        public async Task<ActionResult> FeedConversionRate([FromBody]ReportFeedConversionRateRequest _model)
        {
            ResponseConsult<List<ReportFeedConversionRate>> response = await PostAsJsonAsync<List<ReportFeedConversionRate>>(URI_API.REPORT_FEED_CONVERSION_RATE, _model);
            return Ok(response);
        }
        [HttpPost("farmingseason")]
        public async Task<ActionResult> FarmingSeason([FromBody]ReportFarmingSeasonRequest _model)
        {
            ResponseConsult<List<ReportFarmingSeason>> response = await PostAsJsonAsync<List<ReportFarmingSeason>>(URI_API.REPORT_FARMINGSEASON, _model);
            return Ok(response);
        }
        [HttpPost("farmingseason-stock-history")]
        public async Task<ActionResult> FarmingSeasonHistoryStock([FromBody]ReportFarmingSeasonHistoryStockRequest _model)
        {
            ResponseConsult<List<ReportFarmingSeasonHistoryStock>> response = await PostAsJsonAsync<List<ReportFarmingSeasonHistoryStock>>(URI_API.REPORT_FARMINGSEASON_STOCK_HISTORY, _model);
            return Ok(response);
        }
    }
}