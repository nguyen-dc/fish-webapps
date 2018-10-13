using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/stock-issue-dockets")]
    public class StockIssueDocketController : BaseController
    {
        public StockIssueDocketController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            ResponseConsult<PagedList<StockIssueDocketModel>> response = await PostAsJsonAsync<PagedList<StockIssueDocketModel>>(URI_API.STOCK_ISSUE_DOCKET_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_stockIssueDocketId:int}")]
        public async Task<ActionResult> Details(int _stockIssueDocketId)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_DETAIL.Replace("{id}", $"{_stockIssueDocketId}");
            ResponseConsult<ExportStockDetailModel> response = await GetAsync<ExportStockDetailModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]ExportStockModel _model)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_ADD;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_stockIssueDocketId:int}/modify")]
        public async Task<ActionResult> Modify(int _stockIssueDocketId, [FromBody]StockIssueDocketModel _model)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_MODIFY.Replace("{id}", $"{_stockIssueDocketId}");
            ResponseConsult<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_stockIssueDocketId:int}/remove")]
        public async Task<ActionResult> Remove(int _stockIssueDocketId)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_REMOVE.Replace("{id}", $"{_stockIssueDocketId}");
            ResponseConsult<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}