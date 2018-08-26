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
    [Route("api/stock_receive_payslips")]
    public class StockReceivePayslipController : BaseController
    {
        public StockReceivePayslipController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<SupplierModel>> response = await PostAsJsonAsync<PagedList<SupplierModel>>(URI_API.SUPPLIER_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_objectId:int}")]
        public async Task<ActionResult> Details(int _objectId)
        {
            string link = URI_API.SUPPLIER_DETAIL.Replace("{id}", $"{_objectId}");
            APIResponse<SupplierModel> response = await GetAsync<SupplierModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]SupplierModel _model)
        {
            string link = URI_API.SUPPLIER_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_objectId:int}/modify")]
        public async Task<ActionResult> Modify(int _objectId, [FromBody]SupplierModel _model)
        {
            string link = URI_API.SUPPLIER_MODIFY.Replace("{id}", $"{_objectId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_objectId:int}/remove")]
        public async Task<ActionResult> Remove(int _objectId)
        {
            string link = URI_API.SUPPLIER_REMOVE.Replace("{id}", $"{_objectId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}