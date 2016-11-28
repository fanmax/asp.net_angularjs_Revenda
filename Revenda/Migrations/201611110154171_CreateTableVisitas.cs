namespace Revenda.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTableVisitas : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Visitas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClienteId = c.String(maxLength: 128),
                        RevendedorId = c.String(maxLength: 128),
                        Data = c.Time(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ClienteId)
                .ForeignKey("dbo.AspNetUsers", t => t.RevendedorId)
                .Index(t => t.ClienteId)
                .Index(t => t.RevendedorId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Visitas", "RevendedorId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Visitas", "ClienteId", "dbo.AspNetUsers");
            DropIndex("dbo.Visitas", new[] { "RevendedorId" });
            DropIndex("dbo.Visitas", new[] { "ClienteId" });
            DropTable("dbo.Visitas");
        }
    }
}
