﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/stock-receive-dockets")]
    public class StockReceiveDocketController : BaseController
    {
        public StockReceiveDocketController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model)
        {
            APIResponse<PagedList<StockReceiveDocketModel>> response = await PostAsJsonAsync<PagedList<StockReceiveDocketModel>>(URI_API.STOCK_RECEIVE_DOCKET_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_stockReciveDocketId:int}")]
        public async Task<ActionResult> Details(int _stockReciveDocketId)
        {
            string link = URI_API.STOCK_RECEIVE_DOCKET_DETAIL.Replace("{id}", $"{_stockReciveDocketId}");
            APIResponse<StockReceiveDocketModel> response = await GetAsync<StockReceiveDocketModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]StockReceiveDocketModel _model)
        {
            string link = URI_API.STOCK_RECEIVE_DOCKET_ADD;
            APIResponse<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_stockReciveDocketId:int}/modify")]
        public async Task<ActionResult> Modify(int _stockReciveDocketId, [FromBody]StockReceiveDocketModel _model)
        {
            string link = URI_API.STOCK_RECEIVE_DOCKET_MODIFY.Replace("{id}", $"{_stockReciveDocketId}");
            APIResponse<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_stockReciveDocketId:int}/remove")]
        public async Task<ActionResult> Remove(int _stockReciveDocketId)
        {
            string link = URI_API.STOCK_RECEIVE_DOCKET_REMOVE.Replace("{id}", $"{_stockReciveDocketId}");
            APIResponse<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}