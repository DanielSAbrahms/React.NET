using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.NET.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CalculationController : ControllerBase
    {
        [HttpPost]
        public ActionResult<double> Post(Calculation calculation)
        {
            double num1 = calculation.Number1;
            double num2 = calculation.Number2;

            switch (calculation.Operation)
            {
                case "Addition":
                    return num1 + num2;
                case "Subtraction":
                    return num1 - num2;
                case "Multiplication":
                    return num1 * num2;
                case "Division":
                    if (num2 == 0)
                    {
                        return BadRequest();
                    } else
                    {
                        return num1 / num2;
                    }
                default:
                    return NotFound();
            }
        }
    }
}
