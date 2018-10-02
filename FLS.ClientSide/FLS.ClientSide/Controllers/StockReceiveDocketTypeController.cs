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
    [Route("api/stock-receive-docket-types")]
    public class StockReceiveDocketTypeController : BaseController
    {
        public StockReceiveDocketTypeController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            ResponseConsult<PagedList<StockReceiveDocketTypeModel>> response = await PostAsJsonAsync<PagedList<StockReceiveDocketTypeModel>>(URI_API.STOCK_RECEIVE_DOCKET_TYPE_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_stockReceiveDocketId:int}")]
        public async Task<ActionResult> Details(int _stockReceiveDocketId)
        {
            string link = URI_API.STOCK_RECEIVE_DOCKET_TYPE_DETAIL.Replace("{id}", $"{_stockReceiveDocketId}");
            ResponseConsult<StockReceiveDocketTypeModel> response = await GetAsync<StockReceiveDocketTypeModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]StockReceiveDocketTypeModel _model)
        {
            string link = URI_API.STOCK_RECEIVE_DOCKET_TYPE_ADD;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_stockReceiveDocketId:int}/modify")]
        public async Task<ActionResult> Modify(int _stockReceiveDocketId, [FromBody]StockReceiveDocketTypeModel _model)
        {
            string link = URI_API.STOCK_RECEIVE_DOCKET_TYPE_MODIFY.Replace("{id}", $"{_stockReceiveDocketId}");
            ResponseConsult<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_stockReceiveDocketId:int}/remove")]
        public async Task<ActionResult> Remove(int _stockReceiveDocketId)
        {
            string link = URI_API.STOCK_RECEIVE_DOCKET_TYPE_REMOVE.Replace("{id}", $"{_stockReceiveDocketId}");
            ResponseConsult<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}