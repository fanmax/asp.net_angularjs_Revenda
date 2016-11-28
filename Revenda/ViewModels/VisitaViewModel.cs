using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Revenda.ViewModels
{
    public class VisitaViewModel
    {
        public int Id { get; set; }
        public string ClienteId { get; set; }
        public string RevendedorId { get; set; }
        [Required]
        public DateTime? DataVisita { get; set; }
        public bool? Visitou { get; set; }
    }
}