using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/STOCK_ISSUE_DOCKETs")]
    public class StockIssueReceiptController : BaseController
    {
        public StockIssueReceiptController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<StockIssueDocketModel>> response = await PostAsJsonAsync<PagedList<StockIssueDocketModel>>(URI_API.STOCK_ISSUE_DOCKET_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_stockIssueDockerId:int}")]
        public async Task<ActionResult> Details(int _stockIssueDockerId)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_DETAIL.Replace("{id}", $"{_stockIssueDockerId}");
            APIResponse<StockIssueDocketModel> response = await GetAsync<StockIssueDocketModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]StockIssueDocketModel _model)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_stockIssueDockerId:int}/modify")]
        public async Task<ActionResult> Modify(int _stockIssueDockerId, [FromBody]StockIssueDocketModel _model)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_MODIFY.Replace("{id}", $"{_stockIssueDockerId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_stockIssueDockerId:int}/remove")]
        public async Task<ActionResult> Remove(int _stockIssueDockerId)
        {
            string link = URI_API.STOCK_ISSUE_DOCKET_REMOVE.Replace("{id}", $"{_stockIssueDockerId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}