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
        [HttpPost("cure")]
        public async Task<ActionResult> Cure([FromBody]FeedingLivestockModel _model)
        {
            string link = URI_API.LIVESTOCK_PROCEED_CURE;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPost("deadstocks/collect")]
        public async Task<ActionResult> CollectDeadstock([FromBody]CollectDeadstockRequest _model)
        {
            string link = URI_API.LIVESTOCK_PROCEED_COLLECT_DEADSTOCK;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPost("fcr-check")]
        public async Task<ActionResult> FCRCheck([FromBody]FCRCheckModel _model)
        {
            string link = URI_API.LIVESTOCK_PROCEED_CHECK_FCR;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
    }
}