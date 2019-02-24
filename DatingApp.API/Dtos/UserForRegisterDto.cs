using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string  Username  { get; set; }
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You Must Specify password between 4 and 8 charecter!!")]
        public string Password { get; set; }
        
    }
}