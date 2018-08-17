using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/expenditure-types")]
    public class ExpenditureTypeController : BaseController
    {
        public ExpenditureTypeController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<ExpenditureTypeModel>> response = await PostAsJsonAsync<PagedList<ExpenditureTypeModel>>(URI_API.EXPENDITURE_TYPE_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_expenditureTypeId:int}")]
        public async Task<ActionResult> Details(int _expenditureTypeId)
        {
            string link = URI_API.EXPENDITURE_TYPE_DETAIL.Replace("{id}", $"{_expenditureTypeId}");
            APIResponse<ExpenditureTypeModel> response = await GetAsync<ExpenditureTypeModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]ExpenditureTypeModel _model)
        {
            string link = URI_API.EXPENDITURE_TYPE_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_expenditureTypeId:int}/modify")]
        public async Task<ActionResult> Modify(int _expenditureTypeId, [FromBody]ExpenditureTypeModel _model)
        {
            string link = URI_API.EXPENDITURE_TYPE_MODIFY.Replace("{id}", $"{_expenditureTypeId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_expenditureTypeId:int}/remove")]
        public async Task<ActionResult> Remove(int _expenditureTypeId)
        {
            string link = URI_API.EXPENDITURE_TYPE_REMOVE.Replace("{id}", $"{_expenditureTypeId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}