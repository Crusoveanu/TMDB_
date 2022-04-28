using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMDB.Web.Controllers.Helpers
{
    public class JWTService
    {
        private string secureKey = "my very secure key is 4r1g";

        public string Generate(int id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            //this token will expire in 1 day.
            var paylaod = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(1));
            var securityToken = new JwtSecurityToken(header, paylaod);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        public JwtSecurityToken  Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }
            , out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }

}
