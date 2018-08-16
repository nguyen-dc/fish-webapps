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
    [Route("api/fish-ponds")]
    public class FishPondController : BaseController
    {
        public FishPondController(IConfiguration _config) : base(_config){}
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<FishPondModel>> response = await PostAsJsonAsync<PagedList<FishPondModel>>(URI_API.FISH_POND_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_fishPondId:int}")]
        public async Task<ActionResult> Details(int _fishPondId)
        {
            string link = URI_API.FISH_POND_DETAIL.Replace("{id}", $"{_fishPondId}");
            APIResponse<FishPondModel> response = await GetAsync<FishPondModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]FishPondModel _model)
        {
            string link = URI_API.FISH_POND_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_fishPondId:int}/modify")]
        public async Task<ActionResult> Modify(int _fishPondId, [FromBody]FishPondModel _model)
        {
            string link = URI_API.FISH_POND_MODIFY.Replace("{id}", $"{_fishPondId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_fishPondId:int}/remove")]
        public async Task<ActionResult> Remove(int _fishPondId)
        {
            string link = URI_API.FISH_POND_REMOVE.Replace("{id}", $"{_fishPondId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}