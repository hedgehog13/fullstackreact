using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Extentions
{
    public static class HttpExtensions
    {
        public static void AddpaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new
            {
                currentPage,
                itemsPerPage,
                totalItems,
                totalPages
            };
            response.Headers.Append("Pagination", JsonSerializer.Serialize(paginationHeader));
           
        }

    }
}