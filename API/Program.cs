using API.Extentions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI(
    //     c =>
    // {

    //     c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");
    //     c.RoutePrefix = string.Empty; // Set Swagger UI at the app's root URL

    //     // Show the "Authorize" button for adding a token
    //     c.DocExpansion(DocExpansion.None);
    //     c.DefaultModelExpandDepth(2);
    //     c.DefaultModelRendering(ModelRendering.Model);
    //     c.DefaultModelsExpandDepth(-1);
    //     c.DisplayOperationId();
    //     c.DisplayRequestDuration();
    //     c.EnableDeepLinking();
    //     c.EnableFilter();
    //     c.MaxDisplayedTags(5);
    //     c.ShowExtensions();
    //     c.EnableValidator();
    //     c.SupportedSubmitMethods(SubmitMethod.Get, SubmitMethod.Post, SubmitMethod.Put, SubmitMethod.Delete, SubmitMethod.Patch);

    // }
    );
}

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManger = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManger);

}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}
app.Run();
