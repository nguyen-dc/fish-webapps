using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/stock-issue-docket-types")]
    public class StockIssueDocketTypeController : BaseController
    {
        public StockIssueDocketTypeController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<StockIssueDocketTypeModel>> response = await PostAsJsonAsync<PagedList<StockIssueDocketTypeModel>>(URI_API.STOCK_ISSUE_DOCKET_TYPE_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_stockIssueDocketId:int}")]
        public async Task<ActionResult> Details(int _stockIssueDocketId)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_TYPE_DETAIL.Replace("{id}", $"{_stockIssueDocketId}");
            APIResponse<StockIssueDocketTypeModel> response = await GetAsync<StockIssueDocketTypeModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]StockIssueDocketTypeModel _model)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_TYPE_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_stockIssueDocketId:int}/modify")]
        public async Task<ActionResult> Modify(int _stockIssueDocketId, [FromBody]StockIssueDocketTypeModel _model)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_TYPE_MODIFY.Replace("{id}", $"{_stockIssueDocketId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_stockIssueDocketId:int}/remove")]
        public async Task<ActionResult> Remove(int _stockIssueDocketId)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_TYPE_REMOVE.Replace("{id}", $"{_stockIssueDocketId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}