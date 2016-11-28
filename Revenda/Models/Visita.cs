using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Revenda.Models.Identity;

namespace Revenda.Models
{
    [Table("Visitas")]
    public class Visita
    {
        public int Id { get; set; }
        public string ClienteId { get; set; }
        public string RevendedorId { get; set; }

        [ForeignKey("ClienteId")]
        public virtual Usuario Cliente { get; set; }
        [ForeignKey("RevendedorId")]
        public virtual Usuario Revendedor { get; set; }

        public DateTime? DataVisita { get; set; }
        public bool? Visitou { get; set; }
    }
}