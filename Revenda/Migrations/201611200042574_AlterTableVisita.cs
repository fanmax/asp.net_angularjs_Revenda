namespace Revenda.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterTableVisita : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Visitas", "DataVisita", c => c.DateTime());
            AddColumn("dbo.Visitas", "Visitou", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Visitas", "Visitou");
            DropColumn("dbo.Visitas", "DataVisita");
        }
    }
}
