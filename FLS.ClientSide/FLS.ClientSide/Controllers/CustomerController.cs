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
    [Route("api/customers")]
    public class CustomerController : BaseController
    {
        public CustomerController(IConfiguration _config) : base(_config){}
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            ResponseConsult<PagedList<CustomerModel>> response = await PostAsJsonAsync<PagedList<CustomerModel>>(URI_API.CUSTOMER_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_customerId:int}")]
        public async Task<ActionResult> Details(int _customerId)
        {
            string link = URI_API.CUSTOMER_DETAIL.Replace("{id}", $"{_customerId}");
            ResponseConsult<CustomerModel> response = await GetAsync<CustomerModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]CustomerModel _model)
        {
            string link = URI_API.CUSTOMER_ADD;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_customerId:int}/modify")]
        public async Task<ActionResult> Modify(int _customerId, [FromBody]CustomerModel _model)
        {
            string link = URI_API.CUSTOMER_MODIFY.Replace("{id}", $"{_customerId}");
            ResponseConsult<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_customerId:int}/remove")]
        public async Task<ActionResult> Remove(int _customerId)
        {
            string link = URI_API.CUSTOMER_REMOVE.Replace("{id}", $"{_customerId}");
            ResponseConsult<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}