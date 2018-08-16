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
    [Route("api/farming-seasons")]
    public class FarmingSeasonController : BaseController
    {
        public FarmingSeasonController(IConfiguration _config) : base(_config){}
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<FarmingSeasonModel>> response = await PostAsJsonAsync<PagedList<FarmingSeasonModel>>(URI_API.FARMING_SEASON_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_farmingSeasonId:int}")]
        public async Task<ActionResult> Details(int _farmingSeasonId)
        {
            string link = URI_API.FARMING_SEASON_DETAIL.Replace("{id}", $"{_farmingSeasonId}");
            APIResponse<FarmingSeasonModel> response = await GetAsync<FarmingSeasonModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]FarmingSeasonModel _model)
        {
            string link = URI_API.FARMING_SEASON_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_farmingSeasonId:int}/modify")]
        public async Task<ActionResult> Modify(int _farmingSeasonId, [FromBody]FarmingSeasonModel _model)
        {
            string link = URI_API.FARMING_SEASON_MODIFY.Replace("{id}", $"{_farmingSeasonId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_farmingSeasonId:int}/remove")]
        public async Task<ActionResult> Remove(int _farmingSeasonId)
        {
            string link = URI_API.FARMING_SEASON_REMOVE.Replace("{id}", $"{_farmingSeasonId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}