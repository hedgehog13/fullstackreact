using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class FacebookDto
    {
        public string Identity { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public FacebookPicture Picture { get; set; }

    }
    public class FacebookPicture
    {
        public FacebookPictureData Data { get; set; }
    }
    public class FacebookPictureData
    {
        public string Url { get; set; }
    }
}