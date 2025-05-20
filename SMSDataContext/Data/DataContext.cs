using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SMSDataModel.Model.School;


namespace SMSDataContext.Data
{
    public class DataContext : DbContext
    {
        public DataContext (DbContextOptions<DataContext> options ) : base (options) { }



        public DbSet<School> Schools { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }



    }
}
