using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace LunchSelection.Controllers
{
    [Route("api/[controller]")]
    public class NewController
    {
        [HttpPost("")]
        public object CreateNewSelection()
        {
            return new
            {
                Id = "12345"
            };
        }
    }
}
