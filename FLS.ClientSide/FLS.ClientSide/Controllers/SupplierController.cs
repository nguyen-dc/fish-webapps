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
    [Route("api/suppliers")]
    public class SupplierController : BaseController
    {
        public SupplierController(IConfiguration _config) : base(_config){}
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            ResponseConsult<PagedList<SupplierModel>> response = await PostAsJsonAsync<PagedList<SupplierModel>>(URI_API.SUPPLIER_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_supplierId:int}")]
        public async Task<ActionResult> Details(int _supplierId)
        {
            string link = URI_API.SUPPLIER_DETAIL.Replace("{id}", $"{_supplierId}");
            ResponseConsult<SupplierModel> response = await GetAsync<SupplierModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]SupplierModel _model)
        {
            string link = URI_API.SUPPLIER_ADD;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_supplierId:int}/modify")]
        public async Task<ActionResult> Modify(int _supplierId, [FromBody]SupplierModel _model)
        {
            string link = URI_API.SUPPLIER_MODIFY.Replace("{id}", $"{_supplierId}");
            ResponseConsult<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_supplierId:int}/remove")]
        public async Task<ActionResult> Remove(int _supplierId)
        {
            string link = URI_API.SUPPLIER_REMOVE.Replace("{id}", $"{_supplierId}");
            ResponseConsult<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
        [HttpPost("{_supplierId:int}/branchs")]
        public async Task<ActionResult> BranchList(int _supplierId, [FromBody]PageFilterModel _model)
        {
            string link = URI_API.SUPPLIER_SEARCH_BRANCH.Replace("{id}", $"{_supplierId}");
            ResponseConsult<PagedList<SupplierBranchModel>> response = await PostAsJsonAsync<PagedList<SupplierBranchModel>>(link, _model);
            return Ok(response);
        }
    }
}