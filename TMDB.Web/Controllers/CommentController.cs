using TMDB.Data.Entities;
using TMDB.Data.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace TMDB.Web.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class CommentController : ControllerBase
    {
        private readonly ILogger<CommentController> Logger;
        private readonly CommentService CommentService;
        private readonly UserService UserService;
        public CommentController(ILogger<CommentController> logger, CommentService commentService, UserService userService)
        {
            Logger = logger;
            CommentService = commentService;
            UserService = userService;
        }
        [HttpGet]
        public IActionResult GetCommentsByMovieId(int movieId)
        {
            var comments = CommentService.GetCommentsByMovieId(movieId);
            var message = (comments.Count >= 1) ? "success" : "No results";
            return Ok(new
            {
                message = message,
                comments = comments,
            });
        }
        [HttpPost]
        public IActionResult CreateComment(string commentJson, string userEmail)
        {
            Comment comment = JsonConvert.DeserializeObject<Comment>(commentJson);
            var userId = UserService.GetUserByEmail(userEmail).Id;
            comment.UserId = userId;
            var comm = CommentService.Create(comment);
            return Ok(new
            {
                message = "success",
                comments = comm,
            });
        }
    }
}
