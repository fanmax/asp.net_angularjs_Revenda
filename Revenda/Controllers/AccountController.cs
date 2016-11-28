using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Revenda.Models.Identity;
using Revenda.ViewModels;

namespace Revenda.Controllers
{
    [Authorize]
    public class AccountController : BaseController
    {
        [AllowAnonymous]
        public async Task<JsonResult> RolesList()
        {
            var roles = await RoleManager.Roles.ToArrayAsync();
            return Json(roles, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<JsonResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }


            var user = await UserManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                user = new Usuario
                {
                    Nome = model.Nome,
                    CPF = model.CPF,
                    CEP = model.CEP,
                    Endereco = model.Endereco,
                    Numero = model.Numero,
                    Email = model.Email,
                    UserName = model.Email
                };

                await UserManager.CreateAsync(user, model.Password);

                await UserManager.AddToRoleAsync(user.Id, model.Role);

                return Json(true, JsonRequestBehavior.AllowGet);

            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> getRole()
        {

            var role = await UserManager.GetRolesAsync(User.Identity.GetUserId());

            return Json(role, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> getPerfil()
        {

            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            var role = await UserManager.GetRolesAsync(user.Id);
            var perfil = new
            {
                Nome = user.Nome,
                CEP = user.CEP,
                Endereco = user.Endereco,
                Numero = user.Numero,
                Cidade = user.Cidade,
                UF = user.UF,
                Email = user.Email,
                Role = role[0]
            };
            return Json(perfil, JsonRequestBehavior.AllowGet);
        }

    }
}