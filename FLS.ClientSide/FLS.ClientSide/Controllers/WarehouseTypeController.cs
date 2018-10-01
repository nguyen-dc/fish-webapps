using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/warehouse-types")]
    public class WarehouseTypeController : BaseController
    {
        public WarehouseTypeController(IConfiguration _config) : base(_config){}
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            ResponseConsult<PagedList<WarehouseTypeModel>> response = await PostAsJsonAsync<PagedList<WarehouseTypeModel>>(URI_API.WAREHOUSE_TYPE_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_warehouseId:int}")]
        public async Task<ActionResult> Details(int _warehouseId)
        {
            string link = URI_API.WAREHOUSE_TYPE_DETAIL.Replace("{id}", $"{_warehouseId}");
            ResponseConsult<WarehouseTypeModel> response = await GetAsync<WarehouseTypeModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]WarehouseTypeModel _model)
        {
            string link = URI_API.WAREHOUSE_TYPE_ADD;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_warehouseId:int}/modify")]
        public async Task<ActionResult> Modify(int _warehouseId, [FromBody]WarehouseTypeModel _model)
        {
            string link = URI_API.WAREHOUSE_TYPE_MODIFY.Replace("{id}", $"{_warehouseId}");
            ResponseConsult<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_warehouseId:int}/remove")]
        public async Task<ActionResult> Remove(int _warehouseId)
        {
            string link = URI_API.WAREHOUSE_TYPE_REMOVE.Replace("{id}", $"{_warehouseId}");
            ResponseConsult<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}