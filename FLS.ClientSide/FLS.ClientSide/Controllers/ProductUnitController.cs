using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/product-units")]
    public class ProductUnitController : BaseController
    {
        public ProductUnitController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            ResponseConsult<PagedList<ProductUnitModel>> response = await PostAsJsonAsync<PagedList<ProductUnitModel>>(URI_API.PRODUCT_UNIT_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_unitId:int}")]
        public async Task<ActionResult> Details(int _unitId)
        {
            string link = URI_API.PRODUCT_UNIT_DETAIL.Replace("{id}", $"{_unitId}");
            ResponseConsult<ProductUnitModel> response = await GetAsync<ProductUnitModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]ProductUnitModel _model)
        {
            string link = URI_API.PRODUCT_UNIT_ADD;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_unitId:int}/modify")]
        public async Task<ActionResult> Modify(int _unitId, [FromBody]ProductUnitModel _model)
        {
            string link = URI_API.PRODUCT_UNIT_MODIFY.Replace("{id}", $"{_unitId}");
            ResponseConsult<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_unitId:int}/remove")]
        public async Task<ActionResult> Remove(int _unitId)
        {
            string link = URI_API.PRODUCT_UNIT_REMOVE.Replace("{id}", $"{_unitId}");
            ResponseConsult<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}