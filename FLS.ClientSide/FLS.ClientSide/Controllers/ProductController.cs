using System.Threading.Tasks;
using FLS.ServerSide.SharingObject;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FLS.ClientSide.Controllers
{
    [Route("api/products")]
    public class ProductController : BaseController
    {
        public ProductController(IConfiguration _config) : base(_config) { }
        [HttpPost("")]
        public async Task<ActionResult> List([FromBody]PageFilterModel _model, string type = "stock")
        {
            ResponseConsult<PagedList<ProductModel>> response = null;
            if (type == "livestock")
                response = await PostAsJsonAsync<PagedList<ProductModel>>(URI_API.PRODUCT_SEARCH_LIVESTOCK, _model);
            else
                response = await PostAsJsonAsync<PagedList<ProductModel>>(URI_API.PRODUCT_SEARCH, _model);
            return Ok(response);
        }
        [HttpGet("{_productId:int}")]
        public async Task<ActionResult> Details(int _productId)
        {
            string link = URI_API.PRODUCT_DETAIL.Replace("{id}", $"{_productId}");
            ResponseConsult<ProductModel> response = await GetAsync<ProductModel>(link);
            return Ok(response);
        }
        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody]ProductModel _model)
        {
            string link = URI_API.PRODUCT_ADD;
            ResponseConsult<int> response = await PostAsJsonAsync<int>(link, _model);
            return Ok(response);
        }
        [HttpPut("{_productId:int}/modify")]
        public async Task<ActionResult> Modify(int _productId, [FromBody]ProductModel _model)
        {
            string link = URI_API.PRODUCT_MODIFY.Replace("{id}", $"{_productId}");
            ResponseConsult<bool> response = await PutAsJsonAsync<bool>(link, _model);
            return Ok(response);
        }
        [HttpDelete("{_productId:int}/remove")]
        public async Task<ActionResult> Remove(int _productId)
        {
            string link = URI_API.PRODUCT_REMOVE.Replace("{id}", $"{_productId}");
            ResponseConsult<bool> response = await DeleteAsync<bool>(link);
            return Ok(response);
        }
    }
}