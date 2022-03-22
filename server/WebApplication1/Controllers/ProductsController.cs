using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductContext _context;
        public ProductsController(ProductContext context)
        {
            _context = context;
            
        }
        [HttpGet]
        public IEnumerable<Product> GetProduct()
        {
            return _context.Products.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var Product = _context.Products.Find(id);
            if (Product == null)
                return NotFound();

            return Product;
        }

        [HttpPost]
        public ActionResult<Product> PostProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();

            return CreatedAtAction(
                nameof(GetProduct),
                new { id = product.Id },
                product);
        }

        [HttpDelete("{id}")]
        public ActionResult<Product> DeleteProduct(int id)
        {
            var Product = _context.Products.Find(id);
            if (Product == null)
                return NotFound();

            _context.Products.Remove(Product);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult<Product> PutProduct(int id, Product product)
        {

            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Products.Update(product);
            _context.SaveChanges();

            return NoContent();

        }
    }
}
