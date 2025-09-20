using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace SchoolSync.Persistence
{
    public class DataContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            // Try to locate appsettings.json walking up from current directory
            string basePath = Directory.GetCurrentDirectory();
            string current = basePath;
            string configDir = basePath;
            while (!File.Exists(Path.Combine(current, "appsettings.json")))
            {
                var parent = Directory.GetParent(current);
                if (parent == null) break;
                current = parent.FullName;
            }
            if (File.Exists(Path.Combine(current, "appsettings.json")))
            {
                configDir = current;
            }

            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(configDir)
                .AddJsonFile("appsettings.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            var builder = new DbContextOptionsBuilder<DataContext>();
            var connectionString = configuration.GetConnectionString("PostgresSQLConnectionString")
                ?? Environment.GetEnvironmentVariable("ConnectionStrings__PostgresSQLConnectionString");

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new InvalidOperationException("Connection string 'PostgresSQLConnectionString' not found in configuration or environment.");
            }

            builder.UseNpgsql(connectionString);

            return new DataContext(builder.Options);
        }
    }
}
