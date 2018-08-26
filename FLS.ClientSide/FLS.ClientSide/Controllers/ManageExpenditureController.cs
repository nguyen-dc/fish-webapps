using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/manageexpenditures")]
    public class ManageExpenditureController : BaseController
    {
        public ManageExpenditureController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<ExpenditureDocketModel>> response = await PostAsJsonAsync<PagedList<ExpenditureDocketModel>>(URI_API.EXPENDITURE_TYPE_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_expenditureId:int}")]
        public async Task<ActionResult> Details(int _expenditureId)
        {
            string link = URI_API.EXPENDITURE_TYPE_DETAIL.Replace("{id}", $"{_expenditureId}");
            APIResponse<ExpenditureDocketModel> response = await GetAsync<ExpenditureDocketModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]ExpenditureDocketModel _model)
        {
            string link = URI_API.EXPENDITURE_TYPE_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_expenditureId:int}/modify")]
        public async Task<ActionResult> Modify(int _expenditureId, [FromBody]ExpenditureDocketModel _model)
        {
            string link = URI_API.EXPENDITURE_TYPE_MODIFY.Replace("{id}", $"{_expenditureId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_expenditureId:int}/remove")]
        public async Task<ActionResult> Remove(int _expenditureId)
        {
            string link = URI_API.EXPENDITURE_TYPE_REMOVE.Replace("{id}", $"{_expenditureId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}