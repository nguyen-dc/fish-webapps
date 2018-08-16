using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/product-groups")]
    public class ProductGroupController : BaseController
    {
        public ProductGroupController(IConfiguration _config) : base(_config){}
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<ProductGroupModel>> response = await PostAsJsonAsync<PagedList<ProductGroupModel>>(URI_API.PRODUCT_GROUP_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_groupId:int}")]
        public async Task<ActionResult> Details(int _groupId)
        {
            string link = URI_API.PRODUCT_GROUP_DETAIL.Replace("{id}", $"{_groupId}");
            APIResponse<ProductGroupModel> response = await GetAsync<ProductGroupModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]ProductGroupModel _model)
        {
            string link = URI_API.PRODUCT_GROUP_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_groupId:int}/modify")]
        public async Task<ActionResult> Modify(int _groupId, [FromBody]ProductGroupModel _model)
        {
            string link = URI_API.PRODUCT_GROUP_MODIFY.Replace("{id}", $"{_groupId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_groupId:int}/remove")]
        public async Task<ActionResult> Remove(int _groupId)
        {
            string link = URI_API.PRODUCT_GROUP_REMOVE.Replace("{id}", $"{_groupId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
        [HttpPost("{_groupId:int}/subgroups")]
        public async Task<ActionResult> SubgroupList(int _groupId, [FromBody]PageFilterModel _model)
        {
            string link = URI_API.PRODUCT_GROUP_SEARCH_SUBGROUP.Replace("{id}", $"{_groupId}");
            APIResponse<PagedList<ProductSubgroupModel>> response = await PostAsJsonAsync<PagedList<ProductSubgroupModel>>(link, _model);
            return Ok(response);
        }
        [HttpPost("{_groupId:int}/products")]
        public async Task<ActionResult> ProductList(int _groupId, [FromBody]PageFilterModel _model)
        {
            string link = URI_API.PRODUCT_GROUP_SEARCH_PRODUCT.Replace("{id}", $"{_groupId}");
            APIResponse<PagedList<ProductModel>> response = await PostAsJsonAsync<PagedList<ProductModel>>(link, _model);
            return Ok(response);
        }
    }
}