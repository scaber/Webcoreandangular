using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {

        public IDatingRepository _repo { get; }
        public IMapper _mapper { get; }
        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var messageFromRepo = await _repo.GetMessage(id);
            if (messageFromRepo ==null)
            {
             return NotFound();   
            }
            return Ok(messageFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUSer(int userId,[FromQuery]MessageParams messageParams)
        {
             if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            messageParams.UserId=userId;

            var messageFromRepo = await _repo.GetMessagesForUser(messageParams);
            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messageFromRepo);
            
            Response.AddPagination(messageFromRepo.CurrentPage,messageFromRepo.PageSize,messageFromRepo.TotalCount,messageFromRepo.TotalPages);

            return Ok(messages);


        }
        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId,int recipientId)
        {
             if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var messageFromRepo =await _repo.GetMessageThread(userId,recipientId);

            var messageThread =_mapper.Map<IEnumerable<MessageToReturnDto>>(messageFromRepo);
            
            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId ,MessageForCreationDto messageforcreationDto)
        {
             if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            messageforcreationDto.SenderId=userId;
            var recipient = await _repo.GetUser(messageforcreationDto.RecipientId);
            if (recipient == null)
              return BadRequest("Could not find user");
            
            var message = _mapper.Map<Message>(messageforcreationDto);

             _repo.Add(message);
             var messageToReturn = _mapper.Map<MessageForCreationDto>(message);
             if (await _repo.SaveAll())
             {
                 return CreatedAtRoute("GetMessage", new {id=message.Id},messageToReturn);

             }
             throw new Exception("Creating the message failed on save");

            
        }

    }
}