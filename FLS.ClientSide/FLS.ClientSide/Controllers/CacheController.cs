using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NDC.Connectivities.API;

namespace FLS.ClientSide.Controllers
{
    [Route("api/cache")]
    public class CacheController : BaseController
    {
        public CacheController(IConfiguration _config) : base(_config) { }
        [HttpGet("farm-regions")]
        public async Task<ActionResult> FarmRegionList()
        {
            APIResponse<List<FarmRegionModel>> response = await GetAsync<List<FarmRegionModel>>(URI_API.CACHE_FARM_REGION);
            return Ok(response);
        }
        [HttpGet("fish-ponds")]
        public async Task<ActionResult> FishPondList()
        {
            APIResponse<List<FishPondModel>> response = await GetAsync<List<FishPondModel>>(URI_API.CACHE_FISH_POND);
            return Ok(response);
        }
        [HttpGet("payslip-types")]
        public async Task<ActionResult> PayslipTypeList()
        {
            APIResponse<List<ExpenditureDocketTypeModel>> response = await GetAsync<List<ExpenditureDocketTypeModel>>(URI_API.CACHE_EXPENDITURE_TYPE);
            if (response.isSuccess)
            {
                response.data = response.data.FindAll(d => !d.IsReceipt);
            }
            return Ok(response);
        }
        [HttpGet("product-groups")]
        public async Task<ActionResult> ProductGroupList()
        {
            APIResponse<List<ProductGroupModel>> response = await GetAsync<List<ProductGroupModel>>(URI_API.CACHE_PRODUCT_GROUP);
            return Ok(response);
        }
        [HttpGet("product-subgroups")]
        public async Task<ActionResult> ProductSubgroupList()
        {
            APIResponse<List<ProductSubgroupModel>> response = await GetAsync<List<ProductSubgroupModel>>(URI_API.CACHE_PRODUCT_SUBGROUP);
            return Ok(response);
        }
        [HttpGet("product-units")]
        public async Task<ActionResult> ProductUnitList()
        {
            APIResponse<List<ProductUnitModel>> response = await GetAsync<List<ProductUnitModel>>(URI_API.CACHE_PRODUCT_UNIT);
            return Ok(response);
        }
        [HttpGet("receipt-types")]
        public async Task<ActionResult> ReceiptTypeList()
        {
            APIResponse<List<ExpenditureDocketTypeModel>> response = await GetAsync<List<ExpenditureDocketTypeModel>>(URI_API.CACHE_EXPENDITURE_TYPE);
            if (response.isSuccess)
            {
                response.data = response.data.FindAll(d => d.IsReceipt);
            }
            return Ok(response);
        }
        [HttpGet("tax-percents")]
        public async Task<ActionResult> TaxPercentList()
        {
            APIResponse<List<TaxPercentModel>> response = await GetAsync<List<TaxPercentModel>>(URI_API.CACHE_TAX_PERCENT);
            return Ok(response);
        }
        [HttpGet("warehouses")]
        public async Task<ActionResult> WarehouseList()
        {
            APIResponse<List<WarehouseModel>> response = await GetAsync<List<WarehouseModel>>(URI_API.CACHE_WAREHOUSE);
            return Ok(response);
        }
        [HttpGet("warehouse-types")]
        public async Task<ActionResult> WarehouseTypeList()
        {
            APIResponse<List<WarehouseTypeModel>> response = await GetAsync<List<WarehouseTypeModel>>(URI_API.CACHE_WAREHOUSE_TYPE);
            return Ok(response);
        }
        [HttpGet("stock-receive-docket-types")] //loại phiếu nhập
        public async Task<ActionResult> StockReceiveDocketTypeList()
        {
            APIResponse<List<StockReceiveDocketTypeModel>> response = await GetAsync<List<StockReceiveDocketTypeModel>>(URI_API.CACHE_STOCK_RECEIVE_DOCKET_TYPE);
            return Ok(response);
        }
        [HttpGet("stock-issue-docket-types")] // loại phiếu xuất
        public async Task<ActionResult> StockIssueDocketTypeList()
        {
            APIResponse<List<StockIssueDocketTypeModel>> response = await GetAsync<List<StockIssueDocketTypeModel>>(URI_API.CACHE_STOCK_ISSUE_DOCKET_TYPE);
            return Ok(response);
        }
    }
}