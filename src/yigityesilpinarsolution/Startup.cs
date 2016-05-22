using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using yigityesilpinarsolution.Models;
using Microsoft.Extensions.Logging;

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

            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<StockContext>();

            services.AddMvc();
            services.AddLogging();
            services.AddSingleton(provider => Configuration);

            // Singleton Life of a web server always the same instance
            // Scoped-> reuse the instance during life of a Request, everybody everytime  
            // Transient -> always getting new instance of this class
            services.AddTransient<StockContextSeedData>();

            services.AddSingleton<StockRepository>();
        }


        public void Configure(
            IApplicationBuilder app,
             ILoggerFactory loggerFactory,
             StockContextSeedData seedData
            )
        {
            app.UseIISPlatformHandler();
            
            
            app.UseFileServer();
            app.UseMvc(routeBuilder => routeBuilder.MapRoute("Default", "{controller=Home}/{action=Index}/{id?}"));

            app.UseDeveloperExceptionPage();
            app.Run(async (context) =>
            {
                var logger = loggerFactory.CreateLogger("Catchall Endpoint");
                logger.LogInformation("No endpoint found for request {path}", context.Request.Path);
                await context.Response.WriteAsync("Path does not exist");
            });
            seedData.EnsureSeedData();
        }


        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
