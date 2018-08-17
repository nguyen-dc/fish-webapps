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
    [Route("api/farm-regions")]
    public class FarmRegionController : BaseController
    {
        public FarmRegionController(IConfiguration _config) : base(_config){}
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<FarmRegionModel>> response = await PostAsJsonAsync<PagedList<FarmRegionModel>>(URI_API.FARM_REGION_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_farmRegionId:int}")]
        public async Task<ActionResult> Details(int _farmRegionId)
        {
            string link = URI_API.FARM_REGION_DETAIL.Replace("{id}", $"{_farmRegionId}");
            APIResponse<FarmRegionModel> response = await GetAsync<FarmRegionModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]FarmRegionModel _model)
        {
            string link = URI_API.FARM_REGION_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_farmRegionId:int}/modify")]
        public async Task<ActionResult> Modify(int _farmRegionId, [FromBody]FarmRegionModel _model)
        {
            string link = URI_API.FARM_REGION_MODIFY.Replace("{id}", $"{_farmRegionId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_farmRegionId:int}/remove")]
        public async Task<ActionResult> Remove(int _farmRegionId)
        {
            string link = URI_API.FARM_REGION_REMOVE.Replace("{id}", $"{_farmRegionId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}