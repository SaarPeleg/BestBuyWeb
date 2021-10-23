using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace BestBuyApi.Controllers
{
    public class BestBuyController : ApiController
    {
       /// <summary>
       /// simple api call to get bestbuy products
       /// </summary>
       /// <param name="page">This is the page number to search for and to return results to</param>
       /// <param name="sort">This is the parameter that controls the field that is used to sort the results</param>
       /// <param name="textsearch">searchs for specific text in the product name</param>
       /// <returns>the results from the bestbuy api</returns>
        public HttpResponseMessage Get(int page,string sort,string textsearch,string deletelist)
        {
            string apikey = ConfigurationManager.AppSettings["ApiKey"];
            string currentPage = (page <= 0 ? 1 : page).ToString();//the current page we are at, returns 1 if zero or lower, in case someone mess with the front-end in his browser.
            string sortText = (sort == null|| sort.CompareTo("") == 0 ? "" : ("&sort=" + sort));//decides if we need to sort by name, by start date or by something else.
            string searchByName = "(name="+ textsearch + "*)";
            string delist = deletelist==null|| deletelist==""?"":"!(sku in(" + deletelist + "))&";
            HttpClient client=new HttpClient();
            var utlt = "https://api.bestbuy.com/v1/products(" + delist + searchByName + ")" + "?pageSize=50&page=" + currentPage + "&format=json&show=shortDescription,type,sku,name,salePrice,image,images,startDate,plot&apiKey=" + apikey + sortText;
            var task = Task.Run(() => client.GetAsync("https://api.bestbuy.com/v1/products("+ delist+ searchByName + ")"+"?pageSize=50&page=" + currentPage + "&format=json&show=shortDescription,type,sku,name,salePrice,image,images,startDate,plot&apiKey=" + apikey+sortText));
            task.Wait();
            var response = task.Result;
            return response;
        }

        // POST api/values
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
