using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.PlatformAbstractions;

namespace yigityesilpinarsolution
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }
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
            services.AddSingleton(provider => Configuration);
        }


        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment enviroment,
            IApplicationEnvironment appEnvironment
            )
        {
            app.UseIISPlatformHandler();
            app.UseFileServer();

            app.UseMvc(routeBuilder => routeBuilder.MapRoute("Default", "{controller=Home}/{action=Index}/{id?}"));

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World Yigit!");
            });
        }


        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
