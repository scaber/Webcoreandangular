using System;
using System.Collections.Generic;

namespace DatingApp.API.Dtos
{
    public class PhotosForDetailedDto
    {
         public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; } 
    
    }
}