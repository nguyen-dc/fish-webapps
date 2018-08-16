using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/product-subgroups")]
    public class ProductSubGroupController : BaseController
    {
        public ProductSubGroupController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<ProductSubgroupModel>> response = await PostAsJsonAsync<PagedList<ProductSubgroupModel>>(URI_API.PRODUCT_SUBGROUP_SEARCH_ALL, _model);
            return Ok(response);
        }
        [HttpGet("{_subgroupId:int}")]
        public async Task<ActionResult> Details(int _subgroupId)
        {
            string link = URI_API.PRODUCT_SUBGROUP_DETAIL.Replace("{id}", $"{_subgroupId}");
            APIResponse<ProductSubgroupModel> response = await GetAsync<ProductSubgroupModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]ProductSubgroupModel _model)
        {
            string link = URI_API.PRODUCT_SUBGROUP_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_subgroupId:int}/modify")]
        public async Task<ActionResult> Modify(int _subgroupId, [FromBody]ProductSubgroupModel _model)
        {
            string link = URI_API.PRODUCT_SUBGROUP_MODIFY.Replace("{id}", $"{_subgroupId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_subgroupId:int}/remove")]
        public async Task<ActionResult> Remove(int _subgroupId)
        {
            string link = URI_API.PRODUCT_SUBGROUP_REMOVE.Replace("{id}", $"{_subgroupId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
        [HttpPost("{_subgroupId:int}/products")]
        public async Task<ActionResult> ProductList(int _subgroupId, [FromBody]PageFilterModel _model)
        {
            string link = URI_API.PRODUCT_SUBGROUP_SEARCH_PRODUCT.Replace("{id}", $"{_subgroupId}");
            APIResponse<PagedList<ProductModel>> response = await PostAsJsonAsync<PagedList<ProductModel>>(link, _model);
            return Ok(response);
        }
    }
}