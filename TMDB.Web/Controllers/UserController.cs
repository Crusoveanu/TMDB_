using System;
using TMDB.Data.Entities;
using TMDB.Data.Models.DTO.User;
using TMDB.Data.Services;
using TMDB.Web.Controllers.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TMDB.Web.Controllers
{
	//[Authorize]
	[ApiController]
	[Route("[controller]/[action]")]
	public class UserController : ControllerBase
	{
		private readonly ILogger<UserController> Logger;
		private readonly UserService UserService;
		private readonly JWTService JwtService;

		public UserController(ILogger<UserController> logger, UserService userService, JWTService jwtService)
		{
			Logger = logger;
			UserService = userService;
			JwtService = jwtService;
		}

		[HttpPost]
		public IActionResult Register(RegisterDto dto)
		{
            Logger.LogInformation("Register user");

			var user = new User
			{
				FirstName = dto.FirstName,
				LastName = dto.LastName,
				UserPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password),
				UserEmail = dto.Email,
			};
			user = UserService.Create(user);

			return Ok(new
			{
				user = user
			});
		}

		[HttpPost]
		public IActionResult Login(LoginDto dto)
		{
			Logger.LogInformation("Login user");

			User user = UserService.GetUserByEmail(dto.Email);

			if (user == null) return BadRequest(error: new { message = "Invalid Credentials" });
			if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.UserPassword))
            {
				return BadRequest(error: new { message = "Invalid Credentials" }); 
			}

			var jwt = JwtService.Generate(user.Id);

			Response.Cookies.Append("jwt", jwt, new CookieOptions { 
				HttpOnly = true
			});

			return Ok(new { 
				user = user
			});
		}

		[HttpGet]
		public IActionResult User()
        {
            try
            {
				var jwt = Request.Cookies["jwt"];

				var token = JwtService.Verify(jwt);
				int userId = int.Parse(token.Issuer);
				User user = UserService.GetUserById(userId);

				return Ok(user);
			}
            catch(Exception e)
            {
				return Unauthorized();
            }
		}

		[HttpPost]
		public IActionResult LogOut()
        {
			Response.Cookies.Delete("jwt");
			return Ok(new
			{
				message = "success"
			});
        }
	}
}
