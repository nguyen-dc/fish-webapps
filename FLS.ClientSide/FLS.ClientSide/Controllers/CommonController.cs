using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FLS.ClientSide.Controllers
{
    public class Select
    {
        public int id { get; set; }
        public string name { get; set; }
    }
    [Route("api/common")]
    public class CommonController : BaseController
    {
        public CommonController(IConfiguration _config) : base(_config) { }

        [HttpGet("productgroup")]
        public JsonResult ProductGroup()
        {
            var lst = new List<Select> {
                new Select
                {
                    id = 1,
                    name = "Thức ăn"
                },
                 new Select
                {
                    id = 2,
                    name = "Thuốc"
                }
            };
            return Json(new { Data = lst, IsSuccessful = true, Status = 1 });
        }
    }
}