using Revenda.Models;
using Revenda.Models.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Revenda
{
    public class ApplicationUserManager : UserManager<Usuario>
    {
        public ApplicationUserManager(UserStore<Usuario> userStore)
            : base(userStore)
        {

        }

        public static ApplicationUserManager Create
            (IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var userStore = new UserStore<Usuario>(context.Get<ApplicationDbContext>());

            return new ApplicationUserManager(userStore);
        }
    }
}