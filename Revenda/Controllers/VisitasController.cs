using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Revenda.Models;
using Revenda.Models.Identity;
using Revenda.ViewModels;

namespace Revenda.Controllers
{
    [Authorize]
    public class VisitasController : BaseController
    {

        protected ApplicationDbContext dbContext;

        public VisitasController()
        {
            dbContext = new ApplicationDbContext();
        }

        // GET: Visitas
        public async Task<JsonResult> Index()
        {
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            var visita = dbContext.Visitas.Where(v => v.RevendedorId == user.Id || v.ClienteId == user.Id).ToArray();

            return Json(visita, JsonRequestBehavior.AllowGet);
        }

        // GET: VisitasDisponiveis
        public async Task<JsonResult> Disponiveis()
        {

            var visita = dbContext.Visitas.Where(v => v.RevendedorId == null && v.ClienteId != null).ToArray();

            return Json(visita, JsonRequestBehavior.AllowGet);
        }

        // GET: VisitasDisponiveis
        public async Task<JsonResult> Agendadas()
        {

            var userId = User.Identity.GetUserId();

            var visita = dbContext.Visitas.Where(v => v.RevendedorId == userId && v.Visitou != true).ToArray();

            return Json(visita, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(VisitaViewModel model)
        {

            var clienteId = User.Identity.GetUserId();


            if (!ModelState.IsValid)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(HttpStatusCode.BadRequest, JsonRequestBehavior.AllowGet);
            }

            var v = new Visita
            {
                ClienteId = clienteId,
                DataVisita = model.DataVisita,
                Visitou = false
            };

            var visita = dbContext.Visitas.Add(v);
            dbContext.SaveChanges();
            return Json(visita, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult PegarVisita(int Id)
        {

            var v = dbContext.Visitas.Where(a => a.Id == Id).FirstOrDefault();

            var visita = new Visita
            {
                Id = v.Id,
                ClienteId = v.ClienteId,
                RevendedorId = User.Identity.GetUserId(),
                DataVisita = v.DataVisita
            };

            dbContext.Visitas.AddOrUpdate(visita);
            dbContext.SaveChanges();
            return Json(visita, JsonRequestBehavior.AllowGet);
        }

    }
}