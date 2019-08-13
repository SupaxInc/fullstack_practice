using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using webAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : Controller
    {
        private readonly AuthenticationContext _context;

        public ListController(AuthenticationContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// Creates a new to-do item
        /// </summary>
        /// <returns></returns>
        [HttpPost] // PATH URL: api/list
        public async Task<ActionResult<List>> PostListItem(ListModel model)
        {
            // Get the user ID depending on the person that is logged in using JWT
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var list = new List()
            {
                Id = model.Id,
                Description = model.Description,
                IsCompleted = 'N',
                LastModified = DateTime.Now,
                UserFK = userId
            };
            try
            {
                await _context.AddAsync(list);
                await _context.SaveChangesAsync();
                var result = await _context.ApplicationUsers
                                .Include(x => x.Lists)
                                .FirstOrDefaultAsync(x => x.Id == model.UserFK);
                return Ok(result);  // returns full JSON object with a HTTP 201 result
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // THIS METHOD COULD BE USED FOR ADMIN PURPOSES
        /// <summary>
        /// Gets ALL existing to-do items
        /// </summary>
        /// <returns></returns>
        //[HttpGet]   // PATH URL: api/list
        //public async Task<IEnumerable<List>> GetAllListItems()
        //{
        //    return await _context.ListItems.ToListAsync();
        //}


        /// <summary>
        /// Gets ALL to-do items from logged in user
        /// </summary>
        /// <returns></returns>
        [HttpGet]   // PATH URL: api/list/n
        public async Task<IEnumerable<List>> GetListItems()
        {
            // Get the User ID from logged in User
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            // Find the To-do items depending on the logged in user
            // Uses LINQ query to match the user ID with user FK 
            var result = await _context.ListItems.Where(x => x.UserFK == userId).ToListAsync();
            return result;
        }

        /// <summary>
        /// Replaces to-do item from specific id
        /// </summary>
        /// <param name="id">To-do Id</param>
        /// <param name="model">List</param>
        /// <returns></returns>
        [HttpPut("{id}")]   // PATH URL: api/list/n
        public async Task<Object> PutListItem(int id, ListModel model)
        {
            if(id != model.Id)
            {
                return BadRequest();
            }
            // Since the List Item is modified we make sure to update the DateTime
            model.LastModified = DateTime.Now;
            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Patches to-do item from specific id
        /// </summary>
        /// <param name="id">To-do Id</param>
        /// <param name="listPatch"></param>
        /// <returns></returns>
        [HttpPatch("{id}")] // PATH URL: api/list/n
        public async Task<IActionResult> PatchListItem(int id, [FromBody]JsonPatchDocument<List> listPatch)
        {
            try
            {
                if(listPatch == null)
                {
                    return BadRequest();
                }

                // Get the User ID from logged in User
                string userId = User.Claims.First(c => c.Type == "UserID").Value;

                // Retrieve the list of to-do items from logged in user
                // this will prevent the changing of different items from other users
                var result = await _context.ApplicationUsers
                                .Include(x => x.Lists)
                                .FirstOrDefaultAsync(x => x.Id == userId);

                // Get the specific to-do item from the id
                var item = result.Lists.SingleOrDefault(x => x.Id == id);

                // Retrieve the list items from the database for the specified id
                // var result = await _context.ListItems.SingleOrDefaultAsync(x => x.Id == id);

                if (item == null)
                {
                    return NotFound();
                }
                // Change the date to when the HTTP request was sent
                item.LastModified = DateTime.Now;
                // Apply the operations on the list datatables
                listPatch.ApplyTo(item, ModelState);

                // Validating the model to verify that all validation rules are respected
                var isValid = TryValidateModel(result);

                if(!isValid)
                {
                    return BadRequest(ModelState);
                }
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        /// Deletes to-do from specific id
        /// </summary>
        /// <param name="id">To-do Id</param>
        /// <returns></returns>
        [HttpDelete("{id}")]    // PATH URL: api/list/n
        public async Task<Object> DeleteListItem(int id)
        {
            // Retrieve the list from the database for the specified Id
            var list = await _context.ListItems.SingleOrDefaultAsync(x => x.Id == id);
            if (list == null)
            {
                return NotFound();  // 404 not found error
            }
            _context.ListItems.Remove(list);
            await _context.SaveChangesAsync();

            return Ok(list);
        }

    }
}
