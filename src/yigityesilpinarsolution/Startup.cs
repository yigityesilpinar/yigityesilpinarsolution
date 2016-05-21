using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.PlatformAbstractions;
using yigityesilpinarsolution.Models;

namespace yigityesilpinarsolution
{
    public class Startup
    {
        public static IConfiguration Configuration { get; set; }
        public Startup()
        {
            // Define configuration sources for the App
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json");

            Configuration = builder.Build();
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<StockContext>();

            services.AddSingleton(provider => Configuration);

            // Singleton Life of a web server always the same instance
            // Scoped-> reuse the instance during life of a Request, everybody everytime  
            // Transient -> always getting new instance of this class
            services.AddTransient<StockContextSeedData>();

            services.AddSingleton<StockRepository>();
        }


        public void Configure(
            IApplicationBuilder app,
            StockContextSeedData seedData
            )
        {
            app.UseIISPlatformHandler();

            app.UseFileServer();
            app.UseMvc(routeBuilder => routeBuilder.MapRoute("Default", "{controller=Home}/{action=Index}/{id?}"));

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Path does not exist");
            });
            seedData.EnsureSeedData();
        }


        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
