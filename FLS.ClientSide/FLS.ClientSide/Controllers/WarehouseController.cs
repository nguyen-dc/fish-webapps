using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/warehouses")]
    public class WarehouseController : BaseController
    {
        public WarehouseController(IConfiguration _config) : base(_config){}
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<WarehouseModel>> response = await PostAsJsonAsync<PagedList<WarehouseModel>>(URI_API.WAREHOUSE_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_warehouseId:int}")]
        public async Task<ActionResult> Details(int _warehouseId)
        {
            string link = URI_API.WAREHOUSE_DETAIL.Replace("{id}", $"{_warehouseId}");
            APIResponse<WarehouseModel> response = await GetAsync<WarehouseModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]WarehouseModel _model)
        {
            string link = URI_API.WAREHOUSE_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_warehouseId:int}/modify")]
        public async Task<ActionResult> Modify(int _warehouseId, [FromBody]WarehouseModel _model)
        {
            string link = URI_API.WAREHOUSE_MODIFY.Replace("{id}", $"{_warehouseId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_warehouseId:int}/remove")]
        public async Task<ActionResult> Remove(int _warehouseId)
        {
            string link = URI_API.WAREHOUSE_REMOVE.Replace("{id}", $"{_warehouseId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}