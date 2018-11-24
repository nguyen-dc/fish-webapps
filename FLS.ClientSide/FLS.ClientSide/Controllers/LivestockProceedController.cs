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
    [Route("api/livestock-proceeds")]
    public class LivestockProceedController : BaseController
    {
        public LivestockProceedController(IConfiguration _config) : base(_config) { }

        [HttpPost("release")]
        public async Task<ActionResult> Add([FromBody]ReleaseLivestockModel _model)
        {
            string link = URI_API.LIVESTOCK_PROCEED_RELEASE;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPost("feed")]
        public async Task<ActionResult> Feed([FromBody]FeedingLivestockModel _model)
        {
            string link = URI_API.LIVESTOCK_PROCEED_FEED;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
    }
}