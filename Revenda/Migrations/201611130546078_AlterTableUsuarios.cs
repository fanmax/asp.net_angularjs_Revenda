namespace Revenda.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterTableUsuarios : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Cidade", c => c.String());
            AddColumn("dbo.AspNetUsers", "UF", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "UF");
            DropColumn("dbo.AspNetUsers", "Cidade");
        }
    }
}
