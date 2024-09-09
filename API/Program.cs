using API.Extentions;
using API.Middleware;
using API.SignalR;
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
app.UseDeveloperExceptionPage();
// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
    app.UseXContentTypeOptions();
    app.UseReferrerPolicy(opt => opt.NoReferrer());
    app.UseXXssProtection(opt => opt.EnabledWithBlockMode());//prevent cross site scripting
    app.UseXfo(opt => opt.Deny());//prevent clickjacking (iframe)
    app.UseCsp(opt=>opt
        .BlockAllMixedContent()
        .StyleSources(s=>s.Self().CustomSources("https://fonts.googleapis.com", "sha256-DpOoqibK/BsYhobWHnU38Pyzt5SjDZuR/mFsAiVN7kk="))
        .FontSources(s=>s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
        .FormActions(s=>s.Self())
        .FrameAncestors(s=>s.Self())
        .ImageSources(s=>s.Self().CustomSources("blob:","data:", "https://res.cloudinary.com", "https://platform-lookaside.fbsbx.com" ))
        .ScriptSources(s=>s.Self().CustomSources("https://connect.facebook.net/en_US/sdk.js"))
    );
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}else{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.MapHub<ChatHub>("/chat");

app.MapFallbackToController("Index", "Fallback");

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
