namespace Revenda.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterTableVisitasRemoveData : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Visitas", "Data");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Visitas", "Data", c => c.Time(nullable: false, precision: 7));
        }
    }
}
