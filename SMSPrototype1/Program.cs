//Radhe Radhe Anu 
namespace SMSPrototype1
{
    //jisme change kiya h use stage kru?
    // jse ki prgrm.cs
    // jese hi change kregi vo autometically change me aa jayegiok
    // jb bhi daily kam pura ho jaye ya task pura ho jaye or teko lge ab merge krnah
    // tb ye sb krna dekh
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
